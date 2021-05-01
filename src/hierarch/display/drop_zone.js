import { useDrop } from "react-dnd"

var DropZone = () => {
  var [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      console.log("Dropped", item)
    },
  }))

  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? 'red' : 'none' }}
    >
      { canDrop ? "Drop here." : "Drop Zone."}
    </div>
  )
}

export default DropZone
