import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function StudentForm() {
  const [student, setStudent] = useState(false);
  const initialFormData = {
    name: '',
    age: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  // Update form data on input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation if needed

    // Send a POST request to your server
    try {
      const response = await fetch("http://localhost:3001/newstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful
      if (response.ok) {
        console.log("Data successfully submitted!");
        setFormData(initialFormData);

        // You may want to reset the form or perform other actions after successful submission
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error during data submission:", error);
    }
  };
  function getStudent() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStudent(data);
      });
  }
  // function createStudent() {
  //     let name = prompt('Enter merchant name');
  //     let age = prompt('Enter merchant email');
  //     fetch('http://localhost:3001/newstudent', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({name, age}),
  //     })
  //       .then(response => {
  //         return response.text();
  //       })
  //       .then(data => {
  //         console.log(data);
  //         alert(data);
  //         getStudent();
  //       });
  //   }
  function deleteStudent(id) {
    fetch(`http://localhost:3001/delstudent/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getStudent();
      });
  }

  function updateStudent() {
    let id = prompt("Enter merchant id");
    let name = prompt("Enter new merchant name");
    let age = prompt("Enter new merchant email");
    fetch(`http://localhost:3001/updatestudent/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getStudent();
      });
  }

  useEffect(() => {
    getStudent();
  }, []);
  const datas = Array.from(student);

  return (
    <div>
      <div className="col-md-6 m-auto">
        <Table striped bordered hover className="m-20">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((user) => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => updateStudent(user.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStudent(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="row text-start">
          <h1>User Information</h1>

          <form action="" method="post" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  id="age "
                  onChange={handleInputChange}
                  value={formData.age}
                  placeholder="Age"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
        </div>

        <br />
        <br />

        <br />
      </div>
    </div>
  );
}

export default StudentForm;
