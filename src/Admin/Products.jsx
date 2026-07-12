import { useEffect, useState } from "react";
import "./products.css";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";

function Products() {


  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [editId, setEditId] = useState(null);



  const [form, setForm] = useState({

    productTitle: "",

    productPrice: "",

    categoryId: "",

    description: "",

    stock: "",

    productImage: null,

  });





  useEffect(()=>{

    getProducts();

    getCategories();

  },[]);






  const getProducts = async()=>{

    try{

      const res = await fetch(
        "http://localhost:3001/api/products"
      );

      const data = await res.json();

      setProducts(data);


    }
    catch(error){

      console.log(error);

    }

  };





  const getCategories = async()=>{


    try{


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



  const handleChange = (e)=>{


    if(e.target.name==="productImage"){


      setForm({

        ...form,

        productImage:e.target.files[0]

      });


    }
    else{


      setForm({

        ...form,

        [e.target.name]:e.target.value

      });


    }


  };



  const handleSubmit = async(e)=>{


    e.preventDefault();



    if(!editId && !form.productImage){


      alert("Select product image");

      return;

    }




    const data = new FormData();




    Object.keys(form).forEach((key)=>{


      if(form[key]){

        data.append(
          key,
          form[key]
        );

      }


    });

    try{



      const url = editId

      ? `http://localhost:3001/api/products/${editId}`

      : "http://localhost:3001/api/products";



      const method = editId

      ? "PUT"

      : "POST";


      const res = await fetch(

        url,

        {

          method,

          body:data

        }

      );





      const result = await res.json();





      if(res.ok){



        getProducts();


        resetForm();



      }
      else{


        alert(result.message);


      }





    }
    catch(error){

      console.log(error);

    }



  };


  const editProduct = (product)=>{


    setEditId(product._id);



    setForm({

      productTitle:product.productTitle,

      productPrice:product.productPrice,

      categoryId:product.categoryId?._id || "",

      description:product.description,

      stock:product.stock,

      productImage:null


    });



    setShowModal(true);


  };



  const deleteProduct = async(id)=>{


    try{


      await fetch(

        `http://localhost:3001/api/products/${id}`,

        {

          method:"DELETE"

        }

      );


      getProducts();



    }
    catch(error){

      console.log(error);

    }


  };


  const resetForm = ()=>{


    setForm({

      productTitle:"",

      productPrice:"",

      categoryId:"",

      description:"",

      stock:"",

      productImage:null

    });



    setEditId(null);

    setShowModal(false);


  };


  return (

<div className="products-page">





<div className="products-header">


<h2>Products</h2>



<button

className="add-product-btn"

onClick={()=>{

resetForm();

setShowModal(true);

}}

>

<FiPlus/>

Add Product

</button>



</div>


<table className="products-table">


<thead>


<tr>

<th>Image</th>

<th>Name</th>

<th>Price</th>

<th>Category</th>

<th>Stock</th>

<th>Actions</th>


</tr>


</thead>



<tbody>


{

products.map((product)=>(


<tr key={product._id}>


<td>


<img

src={
`http://localhost:3001/productuploads/${product.productImage}`
}

alt=""

className="product-thumb"

/>


</td>



<td>{product.productTitle}</td>


<td>

Rs. {product.productPrice}

</td>



<td>

{product.categoryId?.title}

</td>



<td>

{product.stock}

</td>


<td>



<button

className="edit-btn"

onClick={()=>editProduct(product)}

>

<FiEdit/>

</button>






<button

className="delete-btn"

onClick={()=>deleteProduct(product._id)}

>

<FiTrash2/>

</button>




</td>



</tr>



))


}



</tbody>



</table>



{

showModal && (



<div className="modal-overlay">


<div className="product-modal">



<h2>

{

editId

?

"Update Product"

:

"Add Product"

}


</h2>



<form onSubmit={handleSubmit}>




<input

type="text"

name="productTitle"

placeholder="Product Name"

value={form.productTitle}

onChange={handleChange}

required

/>


<input

type="number"

name="productPrice"

placeholder="Price"

value={form.productPrice}

onChange={handleChange}

required

/>


<select

name="categoryId"

value={form.categoryId}

onChange={handleChange}

required

>


<option value="">

Select Category

</option>



{

categories.map((cat)=>(


<option

key={cat._id}

value={cat._id}

>

{cat.title}

</option>


))


}



</select>



<textarea

name="description"

placeholder="Description"

value={form.description}

onChange={handleChange}

/>







<input

type="number"

name="stock"

placeholder="Stock"

value={form.stock}

onChange={handleChange}

/>







<input

type="file"

name="productImage"

onChange={handleChange}

/>








<div className="modal-buttons">



<button type="submit">


{

editId

?

"Update Product"

:

"Save Product"

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


export default Products;