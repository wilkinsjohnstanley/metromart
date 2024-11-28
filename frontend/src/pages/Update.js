import React from 'react'

const Update = () => {
  // return (
  //   <div className='form'>
  //       <h1>Add New Item</h1>
  //       <input type='text' placeholder='StoreName'></input>
  //       <input type='text' placeholder='Location'></input>
  //       <input type='text' placeholder='ProductName'></input>
  //       <input type='text' placeholder='StockQuantity'></input>
  //       <input type='text' placeholder='ReorderLevel'></input>

  //       </div>
  // )
  return (
    <div className="max-w-container mx-auto px-4">
      
        <form className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Update the inventory
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
          <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Store Name
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter the name of the store here"
              />
         
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Location
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the location"
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Product Name
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the name of the produt"
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Stock Quantity
              </p>
              <input
               
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                placeholder="Enter the quantity of the stock"
              />
              
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Reorder Level
              </p>
              <textarea
                
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter level at which it becomes necessary to reorder"
              ></textarea>
              
              
            </div>
            
            <button
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Add
            </button>
          </div>
        </form>
      
    </div>
  );
}

export default Update
