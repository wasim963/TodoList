let todos=[];
$(document).ready(function () {
   let addbtn=$(`#add`)
   let box=$(`#box`)
   let delbtn=$(`#delete`)
   let list=$(`#list`)
   refreshtodo(true);

   delbtn.click(function(){
      todos=todos.filter(function(val){
         return val.done==false;
      })
      refreshtodo();
   })

   addbtn.click(function(){
      let val=box.val();
      if(!val)
      {
         alert(`please enter a todo`);
      }
      else{
         addtodo(val);
         box.val("");
      }
   })

   function refreshtodo(firsttimeload=false){
      if(firsttimeload==false){
         savetodos();
      }
      
      retrievetodo();
      list.empty();

      for(i in todos){
         let li=createelement(+i);
         list.append(li);
      }
   }

   function moveup(i){
      if(i!=0){
         todos.splice(i-1,0,todos.splice(i,1)[0]);
         refreshtodo();      
      }

   }

   function movedown(i){
      if(i!=todos.length-1){
         todos.splice(i,0,todos.splice(i+1,1)[0]);
         refreshtodo();
      }

   }

   function remove(i){
      todos.splice(i,1);
      refreshtodo();
   }


   function createelement(i){
      let li=$(`<li class="list-group-item"></li>`)
      let container=$(`<div class="container"></div>`)
      let row=$(`<div class="row"></div>`)
      let checkdiv=$(`<div class="col-1"></div>`)

      check=$(`<input type="checkbox">`);
      check.css("margin-top","10px");
      check.click(function(){
         todos[i].done=!todos[i].done;
         refreshtodo();

      })

      let task=$(`<div class="col">${todos[i].task}</div>`)
      task.css("color","darkblue");      

      if(todos[i].done==true){
         task.css("text-decoration","line-through");
      }

      let iconup=$(`<button class="btn btn-success"><i class="fa fa-chevron-up"></i></button>&nbsp;`).click(function(){
         moveup(i);
      })
      let icondown=$(`<button class="btn btn-success"><i class="fa fa-chevron-down"></i></button>`).click(function(){
         movedown(i);
      })
      let rem=$(`<button class="btn btn-danger"><i class="fa fa-times"></i></button>`).click(function(){
         remove(i);
      })

      li.append(container.append(row.append(check).append(task).append(iconup).append("&nbsp;").append(icondown).append("&nbsp;").append(rem)));
      return li;

   }


   function retrievetodo(){
      let item=localStorage.getItem('todos');
      if(item){
         todos=JSON.parse(item);
      }

   }

   function savetodos(){
      localStorage.setItem('todos', JSON.stringify(todos))
   }

   function addtodo(val){
      todos.push({
         task:val,
         done:false
      })
      refreshtodo();
   }

})