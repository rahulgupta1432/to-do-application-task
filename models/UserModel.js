const joi = require("joi");
const {seuqelizeCon,DataTypes,Model}=require("../config/dbConfig");
const bcrypt=require('bcrypt');

class User extends Model{
    async validPassword(password) {
        return await bcrypt.compare(password, this.password);
    }
};
User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    tableName:"users",
    modelName:"User",
    sequelize:seuqelizeCon,
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    },
    timestamps:true
});


const validateUser=async(user)=>{
    const schema=joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        mobile:joi.string().required(),
        password:joi.string().required(),
        isAdmin:joi.boolean()
    });
    
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
};

const loginValidate=async(user)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    let valid = await schema
    .validateAsync(user, { abortEarly: false })
    .catch((error) => {
      return { error };
    });
  if (!valid || (valid && valid.error)) {
    let msg = [];
    for (let i of valid.error.details) {
      msg.push(i.message);
    }
    return { error: msg };
  }
  return { data: valid };
}
module.exports={User,validateUser,loginValidate};