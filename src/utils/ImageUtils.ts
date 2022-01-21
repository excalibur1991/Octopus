import groupBy from 'lodash.groupby'


  
export const intersect = (x,y,width, height, ptX,ptY)=>{
    if((ptX >= x && ptX <= (x + width)) 
    &&(ptY >= y && ptY <= (y + height))) {
      return true;
    }
    return false;
  };

export const intersectCircle = (x, y, ptX, ptY, r=3)=>{
    return (Math.sqrt((x-ptX) * (x-ptX)  + (y - ptY) * (y - ptY)) < r)
}

export const sameDot = (x, y, ptX, ptY)=>{
    if(x == ptX && y == ptY){
        return true;
    }
    return false;
};


export const isOverlaps = (x,y, width, height, x2, y2, width2, height2) => {
    if(( x < x2 + width2) &&
      (y < y2 + height2) &&
      (x2 < x + width) &&
      (y2 < y + height)) 
      return true;
    return false;
};

export const get_box_size = (curblock, blocks)=>{
    const {x, y, width, height} = curblock;
    //filterout same blocks
    const t_blocks = blocks.filter((block)=>block.width == width && block.height == height)

    //find width
    var max_width = 1
    while(true){
      const found = t_blocks.find((block)=>{
        return isOverlaps(x+max_width*width, y, width, height,
          block.x, block.y, block.width, block.height
          )
      })

      if(found) {max_width++;}
      else break;
    }
    
    //find max_height
    var max_height = 1
    var stop = false
    while(true){

      for(var i = 0; i < max_width; i++) {
        const found = t_blocks.find((block)=>isOverlaps(
          x + i*width, y + max_height * height, width, height,
          block.x, block.y, block.width, block.height
        ))

        if (!found){
          stop = true;
          break;
        } 
      }

      if(!stop){
        max_height++;
      }
      else break;
    }
    //find height
    return {max_width, max_height}
};

export const optimizeBlocks = (blocks)=>{
    //group by tag
    var optBlocks = [];
    const tag_group = groupBy(blocks, (block)=>(block.tag));
    const tag_keys = Object.keys(tag_group);

    tag_keys.map((tag_key)=>{
        var _blocks = [];
            //group by width| hieght
        const group = groupBy(tag_group[tag_key], (block)=>(block.width));
        //retrieve rect size
        const group_keys = Object.keys(group);
        
        group_keys.map((key)=>{
        const grouped_blocks = group[key];
        var blocks_per_width = [];
        grouped_blocks.map((block)=>{
            const {max_width, max_height} = get_box_size(block, grouped_blocks);
            //add lists
            blocks_per_width.push({
            x: block.x,
            y: block.y,
            type: 'box',
            tag: block.tag,
            width: max_width * block.width, 
            height: max_height * block.height});
        });
        //sort rect by area size
        blocks_per_width.sort((b1, b2)=>(b2.width * b2.height - b1.width * b1.height));
        if(blocks_per_width.length > 0){
            _blocks.push(blocks_per_width[0]);
        }
        //filter out overlaps
        blocks_per_width.map((block, index)=>{

            const found = _blocks.find((t_block, t_index)=>{
            //skip self compare
            return isOverlaps(block.x, block.y, block.width, block.height, t_block.x, t_block.y, t_block.width, t_block.height)
            })

            if(!found){
            //final block
            _blocks.push(block);
            }
        });
        optBlocks = [..._blocks];
        });

    });
    return optBlocks;
};
