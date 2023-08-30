const Degree = ({ temp }: {temp: number }): JSX.Element => {
    return (
      <span>
          {temp}<sup>o</sup>
      </span>
    )
  }
  
  export default Degree