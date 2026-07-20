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

    <section className="max-w-[1280px] mx-auto py-20 px-8 border-t border-outline-variant/30 max-md:py-12 max-md:px-4">

      <div className="grid grid-cols-3 gap-6 text-center max-lg:grid-cols-2 max-sm:grid-cols-1">


        {values.map((item,index)=>(

          <div className="flex flex-col items-center p-6" key={index}>


            <div className="w-16 h-16 bg-primary/5 rounded-full flex justify-center items-center text-primary mb-6">

              <span className="material-symbols-outlined text-[40px]">
                {item.icon}
              </span>

            </div>



            <h4 className="font-display text-[32px] text-primary mb-3 font-bold">
              {item.title}
            </h4>



            <p className="text-on-surface-variant leading-[1.6] text-base">
              {item.description}
            </p>


          </div>


        ))}



      </div>


    </section>

  );
}


export default Values;
