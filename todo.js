//=====================================================variables=================================

let tasks=[];
const tasksList=document.getElementById("list");
const addtaskInput=document.getElementById("add");
const taskCounter=document.getElementById("task-counter");
const addButton=document.getElementById('imgs');
let completed=0;
let uncompleted=0;

const unc=document.getElementById('unc');
const comp=document.getElementById('comp');


// ==========================================addTaskToDom-Function==================================================

function addTaskToDom(task){
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.done ?'checked' : ''}  class="custom-checkbox">
      <label for="${task.id}"><b>${task.text}</b></label> 
      <img src="icons8-delete-64.png" class="delete" data-id="${task.id}"></img>
      `;
      tasksList.append(li);
      
  }

 // ============================================renderList-Function==================================================
function renderList(){
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDom(tasks[i]);
        // console.log("hai");
    }
      
    taskCounter.innerHTML=tasks.length;
}
// ===============================================================toggleTask-Function=========================================
function toggleTask(taskId){
    const task=tasks.filter(function (task){
        return task.id===taskId;
    });
    if(task.length>0){
        const currentTask=task[0];
        currentTask.done=!currentTask.done;
        renderList();
        // showNotification("toggled Successfully");
        uncompleted--;
        completed++;
        
        // console.log("completed count ",completed);
        // console.log("uncompleted list",tasks.length-completed);
        return;
    }
    showNotification("couldnot toggle the task");

}
// ===========================================================================deleteTask-Function========================================
function deleteTask(taskId){
    const newTasks=tasks.filter(function (task){
        return task.id!==taskId;
    });
    tasks=newTasks;
    renderList();
    // showNotification("task deleted successfully");
}

// ============================================================================addTask-Function=====================================

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        // showNotification("task added Successfully");
        return;
    }

    showNotification("task can not be added");
}
// =====================================================================showNotification-function======================================================
function showNotification(text){
    alert(text);
}

function delecates(e){
const target=e.target;
// console.log(target);

if(target.className==="delete"){
    const ccn=target.dataset.id;
    deleteTask(ccn);
    return;
}else if(target.className==="custom-checkbox"){
    const cca=target.id;
    toggleTask(cca);
    return;

}
}
// ====================================================eventListners=======================================================

// addtaskInput.addEventListener('keyup',handleInputKeypress);
document.addEventListener("click",delecates);

function mAdd(){
document.getElementById('add-circled-Plus').addEventListener('mouseover',()=>{
    document.getElementById('imgs').style.visibility='visible';
});

document.getElementById('add-circled-Plus').addEventListener("mouseout", ()=>{
    document.getElementById('imgs').style.visibility='hidden';
    
});
}
mAdd();
// ======================================================Add-Button-Click======================================================================

addButton.addEventListener('click',()=>{
    const texta=addtaskInput.value;
        // console.log(texta);
        if(!texta.trim()){
        showNotification("Hey task can not be empty");
        return;
            }
            const task={
        text:texta,
        id:Date.now().toString(),
        done:false
    }
    addtaskInput.value='';
    addTask(task);

});
// ================================================================================
// ======================================================================Completed-Uncompleted-Count============================================================


    unc.addEventListener('click',()=>{
        let a=tasks.length-completed;
        if(a>=0){
        unc.innerHTML=a;
    }else{
        unc.innerHTML=0;
    }
        setTimeout(()=>{
            unc.innerHTML="Uncompleted"
        },1000)
    });

    comp.addEventListener('click',()=>{
        comp.innerHTML=completed;
        setTimeout(()=>{
            comp.innerHTML="Completed"
        },1000)
    });
