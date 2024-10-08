# NASA Astrobee Robot

<live-code>
<template>
<!--
  Collada model of NASA's Astrobee robot loaded into a space station scene.
  Model from https://github.com/nasa/astrobee_media/tree/master/astrobee_freeflyer/meshes.
-->

<base href="${host}" /><script src="./importmap.js"></script>

<style>
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    background: #27304d;
  }
  lume-scene {
    touch-action: none;
  }
</style>

<script>
  import('lume/dist/examples/LoadingIcon.js')
</script>

<astrobee-app id="astrobee">

<script type="module">
  import {defineElements, booleanAttribute, Element, element, attribute, html} from 'lume'
  import {MeshPhysicalMaterial} from 'three'
	import {toCreasedNormals} from 'three/examples/jsm/utils/BufferGeometryUtils.js'

  const bodyModelUrl = '/examples/nasa-astrobee-robot/astrobee/body.dae'
  const pmcModelUrl = '/examples/nasa-astrobee-robot/astrobee/pmc.dae'
  const pmcSkinModelUrl = '/examples/nasa-astrobee-robot/astrobee/pmc_skin_.dae'
  const pmcBumperModelUrl = '/examples/nasa-astrobee-robot/astrobee/pmc_bumper.dae'

  // Find more at https://blog.kuula.co/360-images-ruben-frosali
  const lunaStation = '/examples/nasa-astrobee-robot/luna-station.jpg'

  // Registers the LUME elements with their default tag names.
  defineElements()

  // Long live HTML elements!

  element('astrobee-app')(
    class App extends Element {
      static observedAttributeHandlers = {
        rotationDirection: attribute.number(),
        rotationAmount: attribute.number(),
        rotationEnabled: attribute.boolean(),
        view: attribute.string(),
      }

      rotationDirection = 1 // clockwise
      rotationAmount = 0.2 // degrees
      rotationEnabled = true
      view = 'free'

      astrobee
      sceneContainer
      loading
      models = []

      template = () => html`
        <>
          <loading-icon ref=${el => this.loading = el}></loading-icon>

          <div class="sceneContainer hidden" ref=${el => this.sceneContainer = el}>
            <lume-scene webgl enable-css="true" environment=${() => lunaStation}>
              <lume-element3d align-point="0.5 0.5 0.5">
                <lume-camera-rig
                  ref=${el => this.cameraRig = el}
                  active=${() => this.view === 'free'}
                  vertical-angle="30"
                  min-distance="0.4"
                  max-distance="6"
                  dolly-speed="0.002"
                  distance="2"
                />
                <lume-element3d rotation=${() => [this.view === 'top' ? -90 : 0, 0, 0]}>
                  <lume-perspective-camera ref=${el => this.freeCam = el} active=${() => this.view !== 'free'} position="0 0 0.7" />
                </lume-element3d>
              </lume-element3d>

              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 90 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 -90 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 0 90" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="0 0 -90" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="90 80 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="90 -80 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="-90 80 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>
              <lume-point-light intensity="150" align-point="0.5 0.5 0.5" color="#a3ffff" position="-90 -80 0" ><lume-sphere has="basic-material" cast-shadow="false" mount-point="0.5 0.5 0.5" sidedness="front" size="2 2 2"/></lume-point-light>

              <lume-element3d ref=${el => this.astrobee = el} align-point="0.5 0.5 0.5" rotation=${() => this.astrobeeRotation}>
                <lume-collada-model ref=${el => this.models.push(el)} src=${() => bodyModelUrl} />
                <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcModelUrl} />
                <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcSkinModelUrl} />
                <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcBumperModelUrl} />

                <!-- The other side. -->
                <lume-element3d scale="1 1 -1">
                  <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcModelUrl} />
                  <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcSkinModelUrl} />
                  <lume-collada-model ref=${el => this.models.push(el)} src=${() => pmcBumperModelUrl} />
                </lume-element3d>
              </lume-element3d>

              <lume-sphere
                has="basic-material"
                texture=${() => lunaStation}
                color="white"
                align-point="0.5 0.5 0.5"
                mount-point="0.5 0.5 0.5"
                size="200 200 200"
                sidedness="double"
                cast-shadow="false"
                receive-shadow="false"
              />
            </lume-scene>
          </div>

          <div class="ui">
            <fieldset>
              <legend>Rotation</legend>
              <label>
                <input type="checkbox" checked=${() => this.rotationEnabled} onChange=${this.toggleRotation} />&nbsp;
                Enable rotation.
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  checked=${() => this.rotationDirection < 0}
                  onChange=${this.toggleRotationDirection}
                />&nbsp;
                Clockwise rotation.
              </label>
            </fieldset>
            <fieldset>
              <legend>View</legend>
              <label>
                <input type="radio" name="side" checked=${() => this.view === 'side'} onChange=${this.changeView} />&nbsp;
                Side view.
              </label>
              <br />
              <label>
                <input type="radio" name="top" checked=${() => this.view === 'top'} onChange=${this.changeView} />&nbsp;
                Top view
              </label>
              <br />
              <label>
                <input type="radio" name="free" checked=${() => this.view === 'free'} onChange=${this.changeView} />&nbsp;
                Free view
              </label>
            </fieldset>
          </div>
        </>
      `

      css = /*css*/ `
        :host {
          width: 100%;
          height: 100%;
        }

        loading-icon {
          --loading-icon-color: 117, 199, 199; /*light teal*/
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 10px; height: 10px;
        }

        .sceneContainer { width: 100%; height: 100%; }

        .ui {
          position: absolute;
          margin: 15px;
          padding: 10px;
          top: 0;
          left: 0;
          color: white;
          font-family: sans-serif;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 7px;
        }

        fieldset legend {
          color: #75c7c7;
        }
        fieldset {
          border-color: #75c7c7;
          border-radius: 4px;
        }
        fieldset:nth-child(2) legend {
          color: #c595c9;
        }
        fieldset:nth-child(2) {
          border-color: #c595c9;
        }

        .hidden { display: none; }
      `

      astrobeeRotation = (x, y, z, _time) => [
        x,
        y + this.rotationAmount * this.rotationDirection,
        z,
      ]

      toggleRotation = () => {
        this.rotationEnabled = !this.rotationEnabled

        if (this.rotationEnabled) this.astrobee.rotation = this.astrobeeRotation
        else this.astrobee.rotation = () => false // stops rotation
      }

      toggleRotationDirection = () => (this.rotationDirection *= -1)

      changeView = (event) => {
        const input = event.target

        if (input.checked) this.view = input.name
      }

      async connectedCallback() {
        super.connectedCallback()

        const rigCam = this.cameraRig.shadowRoot.querySelector('lume-perspective-camera')
        rigCam.near = this.freeCam.near = 0.1
        rigCam.far = this.freeCam.far = 150

        const promises = []

        for (const model of this.models)
          promises.push(new Promise(resolve => model.on('MODEL_LOAD', resolve)))

        await Promise.all(promises)

        for (const model of this.models) {
          // Here we do some manipulation of the underlying Three.js objects directly.
          model.three.traverse(node => {
            if (node.isLight) node.visible = false

            function newMat(oldMat) {
              return new MeshPhysicalMaterial({
                metalness: 0.5,
                roughness: 0.5,
                ...(oldMat.color ? {color: oldMat.color} : {}),
                ...(oldMat.map ? {map: oldMat.map.clone()} : {}),
              })
            }

            if (node.isMesh) {
              if (Array.isArray(node.material))
                for (const [i, mat] of node.material.entries()) node.material[i] = newMat(mat)
              else
                node.material = newMat(node.material)

              // smooth out the normals so the rendering is not flat-faced unless angle between faces is greater than 25 deg
              node.geometry = toCreasedNormals(node.geometry, (25 / 180) * Math.PI)
            }
        })

        }

        this.sceneContainer.classList.remove('hidden')
        this.loading.remove()
      }
    }
  )
</script>
</template>
</live-code>
