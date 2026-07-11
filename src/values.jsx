import "./values.css";

function Values() {

  const values = [
    {
      icon: "ac_unit",
      title: "Flash Frozen",
      description:
        "Locked in nutrition at the source, preventing spoilage and maintaining flavor integrity better than fresh-shipped."
    },

    {
      icon: "local_shipping",
      title: "Eco-Insulated",
      description:
        "Our sustainable, biodegradable insulation keeps your order frozen for up to 48 hours in transit."
    },

    {
      icon: "verified",
      title: "Chef Approved",
      description:
        "Selected and portioned by professional chefs to ensure the same quality you'd find in top-tier restaurants."
    }
  ];


  return (

    <section className="values-section">

      <div className="values-container">


        {values.map((item,index)=>(

          <div className="value-card" key={index}>


            <div className="value-icon">

              <span className="material-symbols-outlined">
                {item.icon}
              </span>

            </div>



            <h4>
              {item.title}
            </h4>



            <p>
              {item.description}
            </p>


          </div>


        ))}



      </div>


    </section>

  );
}


export default Values;