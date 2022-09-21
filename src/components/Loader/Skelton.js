import React from 'react';
import ContentLoader from 'react-content-loader'

const TableListingLoader = (props) => (
	  <ContentLoader 
	    speed={2}
	    height={25}
	    width={'95%'}
	    backgroundColor="#f3f3f3"
	    foregroundColor="#ecebeb"
	  >
	    <rect x="5" y="5" rx="3" ry="3" width="100%" height="15" /> 
	  </ContentLoader>
)
export default TableListingLoader;

