import { useEffect, useState } from "react";
import "./categories.css";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";

function Categories() {

  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");

  const [image, setImage] = useState(null);

  const [editId, setEditId] = useState(null);



  useEffect(() => {

    getCategories();

  }, []);



  const getCategories = async () => {

    try {

      const res = await fetch(
        "http://localhost:3001/api/categories"
      );

      const data = await res.json();

      setCategories(data);

    }
    catch(error){

      console.log(error);

    }

  };




  const addCategory = async (e) => {

    e.preventDefault();


    if(!editId && !image){

      alert("Please select image");

      return;

    }



    const formData = new FormData();


    formData.append(
      "title",
      title
    );


    if(image){

      formData.append(
        "image",
        image
      );

    }



    try{


      const url = editId

      ? `http://localhost:3001/api/categories/${editId}`

      : "http://localhost:3001/api/categories";



      const method = editId
      ? "PUT"
      : "POST";



      const res = await fetch(
        url,
        {
          method,
          body:formData
        }
      );



      const data = await res.json();



      if(res.ok){


        getCategories();


        resetForm();


      }
      else{

        console.log(data);

        alert(data.message);

      }



    }
    catch(error){

      console.log(error);

    }


  };




  const deleteCategory = async(id)=>{


    try{


      await fetch(

        `http://localhost:3001/api/categories/${id}`,

        {
          method:"DELETE"
        }

      );


      getCategories();


    }
    catch(error){

      console.log(error);

    }


  };





  const editCategory = (category)=>{


    setEditId(category._id);


    setTitle(category.title);


    setImage(null);


    setShowModal(true);


  };





  const resetForm = ()=>{


    setTitle("");

    setImage(null);

    setEditId(null);

    setShowModal(false);


  };





  return (

    <div className="categories-page">



      <div className="categories-header">


        <h2>Categories</h2>



        <button

          className="add-category-btn"

          onClick={()=>{

            resetForm();

            setShowModal(true);

          }}

        >

          <FiPlus />

          Add Category

        </button>



      </div>





      <table className="categories-table">


        <thead>


          <tr>

            <th>Image</th>

            <th>Category Name</th>

            <th>Actions</th>

          </tr>


        </thead>




        <tbody>


        {

        categories.map((category)=>(


          <tr key={category._id}>


            <td>


              <img

                src={
                `http://localhost:3001/uploads/${category.image}`
                }

                alt={category.title}

                className="category-thumb"

              />


            </td>



            <td>

              {category.title}

            </td>




            {/* <td>


              <button

                className="edit-category-btn"

                onClick={()=>editCategory(category)}

              >

                <FiEdit />

              </button>





              <button

                className="delete-category-btn"

                onClick={()=>deleteCategory(category._id)}

              >

                <FiTrash2 />

              </button>



            </td> */}

            <td>
  <div className="category-action-buttons">

    <button
      className="edit-category-btn"
      onClick={()=>editCategory(category)}
    >
      <FiEdit />
    </button>


    <button
      className="delete-category-btn"
      onClick={()=>deleteCategory(category._id)}
    >
      <FiTrash2 />
    </button>

  </div>
</td>



          </tr>


        ))

        }



        </tbody>



      </table>







      {

      showModal && (



      <div className="category-modal-overlay">


        <div className="category-modal">



          <h2>

          {

          editId

          ? "Update Category"

          : "Add Category"

          }


          </h2>





          <form onSubmit={addCategory}>




            <input

              type="text"

              placeholder="Category Name"

              value={title}

              onChange={(e)=>setTitle(e.target.value)}

              required

            />





            <input

              type="file"

              onChange={(e)=>
                setImage(e.target.files[0])
              }

              required={!editId}

            />






            <div className="category-buttons">


              <button type="submit">


                {

                editId

                ? "Update Category"

                : "Save Category"

                }


              </button>





              <button

                type="button"

                onClick={resetForm}

              >

                Cancel

              </button>



            </div>



          </form>



        </div>



      </div>



      )

      }



    </div>

  );

}


export default Categories;