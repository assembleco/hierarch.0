import { useDrop } from "react-dnd"

import { Icon, InlineIcon } from '@iconify/react';
import arrowDownDropCircle from '@iconify-icons/mdi/arrow-down-drop-circle';

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
