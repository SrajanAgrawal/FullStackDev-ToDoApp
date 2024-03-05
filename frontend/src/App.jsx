import './App.css'
import axios from "axios";

function App() {

  const handleAddTask = () => {
    if(document.querySelector('.input-box').value === '') {
      alert('Task is empty');
    } else {
      const data = {
        "task" : document.querySelector('.input-box').value,
      };
      axios.post('http://localhost:5000/api/addTask', data).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
    }
   
  } 



  return (
    <>
      <h1>Time is Money</h1>
      <div>
        <input type="text" className="input-box" />
        <button className="btn" onClick={handleAddTask}>Add</button>
      </div>
    </>
  )
}

export default App
