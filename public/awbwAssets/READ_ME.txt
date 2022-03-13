The convention for terrain file name is <terrain type>_<directional info>_<weather (optional)>
<terrain type> is the game mechanics focused information (shoal/river/road/plain/mountain/forest)
<directional info> is a 4 bit addon that changes based off of terrain type. Bit 1,2,3,4 refer to NESW respectively
    - For bridges 0101 represents a horizontal bridge and 1010 represents a vertical bridge.
    - For shoals, the number represents an arrow from shore out to sea. So a horizontal shoal with the water at the top
        would be shoal_1000
    - For Pipes, Rivers, and Roads, 1 bits represent possible connections to other roads on that side.