import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TweenLite, TimelineMax, Expo, Linear, Back, Sine } from 'gsap';


class Visuals extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }







  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // this.listener = new THREE.AudioListener();
    // this.camera.add( listener );

    this.camera.position.z = 100; 
    this.controls = new OrbitControls(this.camera, this.el);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setSize(width, height);
    this.renderer.setClearColor( 0x000000, 0 );
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };



  addCustomSceneObjects = () => {
    this.knot()

    this.lights()
  };

  knot = () => {
    const geometry = new THREE.TorusKnotGeometry( 25, 5, 64, 8, 5, 11 );
    const material = new THREE.MeshNormalMaterial({
      color: 'red',
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.knot = new THREE.Mesh(geometry, material);

    this.knot.position.set(0,0,0)
    // this.knot.rotation.set(40,20,10)
    // this.knot.scale.set(1,1,1)

    this.scene.add(this.knot);
  }


  lights = () => {
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }










  startAnimationLoop = () => {
    // this.knot.position.x += -.3
    // this.knot.scale.x += -.005

 
    this.knot.rotation.x += 0.01;
    this.knot.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);

    // this.tl = new TimelineMax({paused:true})
    // this.tl.to(this.knot.scale, .5, {x: 2, ease: Expo.easeOut})
    // this.tl.to(this.knot.scale, .5 , {x: .5, ease: Expo.easeOut})
    // this.tl.to(this.knot.position, .5, {x: 2, ease: Expo.easeOut})
    // this.tl.to(this.knot.rotation, .5, {x: Math.PI*2, ease: Expo.easeOut})
    // this.tl.to(this.knot.rotation, .5, {z: Math.PI*.5, ease: Expo.easeOut})
    // this.tl.to(this.knot.scale, .5, {y: .5, ease: Expo.easeOut})

    // this.el.addEventListener('click', () => {
    //   this.tl.play()
    // })

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };



  render() {
    return <div className="visuals" ref={ref => (this.el = ref)} />;
  }
}

export default Visuals