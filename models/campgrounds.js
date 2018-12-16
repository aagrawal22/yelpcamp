
var mongoose=require("mongoose")
//creating a schema
var campSchema=new mongoose.Schema({

      name:String,
      img:String,
      description:String,
      comments:[
        {
        	type: mongoose.Schema.Types.ObjectId,
        	ref: "Comment"
        }
      ],

      author:{
      	id:{
      		type:mongoose.Schema.Types.ObjectId,
      		ref:"User"

      	},
      	username:String

      }
});

//creating a collection named camps
module.exports=mongoose.model("Camp",campSchema);
