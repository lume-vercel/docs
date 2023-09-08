
# <code>class <b>FbxModel</b></code> :id=FbxModel

> :construction: :hammer: Under construction! :hammer: :construction:

Defines the `<lume-fbx-model>` element, for loading 3D
models in the FBX format (.fbx files). It is similar to an `<img>` tag, but for 3D.

HTML Example:

```html
<lume-scene webgl>
  <lume-fbx-model src="path/to/model.fbx"></lume-fbx-model>
</lume-scene>
```

JavaScript Example:

```js
const scene = new Scene
document.body.append(scene)
const model = new FbxModel
model.src = 'path/to/model.fbx'
scene.add(model)
```












        