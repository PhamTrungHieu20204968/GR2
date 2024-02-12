import React from "react";

function ProductDescription({ descriptions }) {
  return (
    <div className='text-lg p-4'>
      {descriptions?.map((item) => {
        return (
          <p key={item.id} className='mb-4 last:mb-0'>
            {item.description}
          </p>
        );
      })}
    </div>
  );
}

export default ProductDescription;
