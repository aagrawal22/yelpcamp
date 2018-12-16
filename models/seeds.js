var mongoose=require("mongoose"),
Camp=require("./campgrounds"),
Comment=require("./comments");

/*data=[
{
	name:"Rhode",
	img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPb3AQwS6oPl0u0-w-XHzlsiD7OSJsXGFTzZ9Hv8w3I9CWY9no",
	description:"This is desc for Rhode", 
},

{
	name:"Mccan",
	img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPb3AQwS6oPl0u0-w-XHzlsiD7OSJsXGFTzZ9Hv8w3I9CWY9no",
	description:"This is desc for Mccan", 
},
{
	name:"Pennsylvania",
	img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPb3AQwS6oPl0u0-w-XHzlsiD7OSJsXGFTzZ9Hv8w3I9CWY9no",
	description:"This is desc for Pennsylvania", 
}
]*/

function seedDB(){
	Camp.remove({},function(err){
		if(err){
			console.log(err)
		}
		/*else{


			data.forEach(function(seed){

				Camp.create(seed,function(err,campgrnd){

					if(err){
						console.log(err)
					}else{

						Comment.create({
							text:"Comment-This is my comment",
							author:"Abhi"

						},function(err,comment){

							if(err){
								console.log(err)
							}else{
                         campgrnd.comments.push(comment);
                         campgrnd.save();

           }


       });

					}
				});


			})	








		}*/
	})

} ;


module.exports=seedDB; 