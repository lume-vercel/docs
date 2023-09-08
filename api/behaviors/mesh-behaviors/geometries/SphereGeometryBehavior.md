
# <code>class <b>SphereGeometryBehavior</b> extends [GeometryBehavior](GeometryBehavior.md)</code> :id=SphereGeometryBehavior

Behavior: `sphere-geometry`

Makes a sphere-shaped geometry on a [`<lume-mesh>`](../../../meshes/Mesh)
element. This is the default geometry behavior on
[`<lume-sphere>`](../../../meshes/Sphere) elements.

The diameter of the sphere is determined by the `x`
[`size`](../../../core/Sizeable#size) of the element.

## Properties

Inherits properties from [GeometryBehavior](GeometryBehavior.md).


### <code>.<b>horizontalSegments</b></code> :id=horizontalSegments

`attribute`

Default: `32`

The number of divisions around the equator of the sphere. A sphere with 10
horizontal segments and 10 vertical segments is made up of 100 flat faces.
        


### <code>.<b>verticalSegments</b></code> :id=verticalSegments

`attribute`

Default: `32`

The number of divisions across the height of the plane. A plane with 10
width segments and 10 height segments is essentially made up of 100 cells
(or 10 rows and 10 columns of smaller planes)
        



Inherits methods from [GeometryBehavior](GeometryBehavior.md).


        