import { useDrop } from "react-dnd"

import { Icon } from '@iconify/react';
import arrowDownDropCircle from '@iconify-icons/mdi/arrow-down-drop-circle';

var DropZone = ({ code }) => {
  var [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    hover(item) {
      console.log("Drop zone", code, "|", "Dragging", item.code)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      console.log("Dropped", item.code, "on", code)
    },
  }))

  return (
    <div
      ref={drop}
      style={{
        border: isOver ? '2px solid rgb(40, 144, 199)' : 'none',
        //height: "100%",
        //width: "100%",
      }}
    >
      { canDrop &&
        <Icon icon={arrowDownDropCircle} color="rgb(40, 144, 199)" />
      }
    </div>
  )
}

export default DropZone
