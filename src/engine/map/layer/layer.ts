/*
    A layer is a 2d grid representing one aspect of a map, which is thus made of multiple layers.
    An advance wars map is made of:
        - A terrain layer
        - A terrain specifier layer
        - A unit layer
        - A unit faction layer
        - An HP layer

    In fog of war, each player will also have:
        - A vision layer

    Each layer has a different representation that will be described in the associated file, this
    code instead creates a generic data structure and helper method.
*/

export {};