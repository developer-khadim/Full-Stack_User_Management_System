import React, { useEffect } from 'react'

const About  = () => {
useEffect(() => {
      document.title = 'About | User Management'; // Setting the title of the document
    }, []);
  return (
    <div>About </div>
  )
}

export default About 