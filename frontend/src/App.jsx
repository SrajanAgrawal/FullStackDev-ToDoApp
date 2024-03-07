import './App.css'
import axios from "axios";
import { useState, useEffect } from 'react';
import { BsFillTrashFill, BsCircleFill, BsCircle } from "react-icons/bs";

function App() {
  // using hooks to store the data
  const [task, setTask] = useState("");
  const [alltask, setAlltask] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getAllTask').then(async (result) => {
      console.log(result);

      // result.data.forEach((element) => {
      //   alltask.push(element.task);
      // })
      setAlltask(result.data);

    }).catch((err) => {
      console.log("Getting all task api error : " + err);
    })
  }, []);

  // const alltaskElements = alltask.map(function(task, index) {
  //   return (
  //     <> 
  //       <div key={index}>
  //         <p>task</p>
  //       </div>
  //     </>
  //   )
  // });



  const handleAddTask = () => {
    if (task === '') {
      alert('Task is empty');
    } else {

      axios.post('http://localhost:5000/api/addTask', {
        "task": task
      }).then(result => {
        location.reload();
        console.log(result);
      }).catch(err => {
        console.log("Add task api error : " + err);
      })
      // location.reload();
      document.querySelector(".input-box").value = "";
    }

  }


  const handleDeleteTask = (id) => {
    // e.preventdefault(); 

    axios.delete('http://localhost:5000/api/deleteTask/' + id).then(result => {
      location.reload();
      console.log(result);
    }).catch(err => {
      console.log(`delete task api error , ${err}`);
    })
  }

  return (
    <>
      <h1>Time is Money</h1>
      <div>
        <input type="text" className="input-box" onChange={(e) => {
          setTask(e.target.value);
          console.log(task);
        }} />
        <button className="btn" onClick={handleAddTask}>Add</button>
      </div>

      {
        alltask.length == 0
          ?
          <div> No Record </div>
          :
          alltask.map((todo, index) => {
            // console.log(todo);
            // return <div key={index}>
            //   <h2>{todo.task}</h2>
            // </div>;
            return <div className='todo' key={index}>
              <div className='checkbox'>

                {todo.done == true ?
                  <BsCircleFill className='icon' /> :
                  <BsCircle className='icon' />}

                <p className='todo-task'> {todo.task} </p>
              </div>
              <div>
                <BsFillTrashFill className='icon' onClick={() => handleDeleteTask(todo._id)} />
              </div>
            </div>
          })
      }

    </>
  )
}

export default App;
