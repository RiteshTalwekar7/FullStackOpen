const Total = ({ parts }) => {
  return <>
    <b><p>
      Total of {parts.reduce((total, part) => {
        return total += part.exercises
      }, 0)} exercises </p></b>
  </>
}

export default Total;