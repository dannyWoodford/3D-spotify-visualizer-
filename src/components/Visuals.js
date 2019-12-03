import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { TweenLite, TimelineMax, Expo, Linear, Back, Sine } from 'gsap';


class Visuals extends Component {

  state={
    tempo: this.props.songAnalysis.track.tempo,
    tempoToggle: 1,
    knot_color:'rgb(255,0,0)',
    knot_color_1: 'rgb(200,100,20)',
    knot_color_2: 'rgb(205,128,100)',
    knot_color_3: 'rgb(205,198,200)',
  }

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);

      this.getTempo()
      this.theTempo()


    setInterval(() => {
      this.setState({
        tempoToggle: this.state.tempoToggle * -1
      })
    }, this.theTempo());

    setInterval(() => {

      this.knot1.position.z += 6 * this.state.tempoToggle
      this.knot2.position.z += 6 * this.state.tempoToggle
      this.knot3.position.z += 5 * this.state.tempoToggle
      this.knot4.position.z += 4 * this.state.tempoToggle
      // this.knot3.position.z += 1 * this.state.tempoToggle
    }, this.theTempo());
      console.log("on mount", this.props.songAnalysis.track.tempo)
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("SCU?", nextProps.songAnalysis !== this.props.songAnalysis)
    return nextProps.songAnalysis !== this.props.songAnalysis
  }

  componentDidUpdate(){
    console.log("visuals update", this.props.songAnalysis)
    this.knot1.position.z = 0
    this.knot2.position.z = 0
    this.knot3.position.z = 0
    this.knot4.position.z = 0

    this.getTempo()
    this.theTempo()

    this.moveOnTempo()

    console.log("on update",this.props.songAnalysis.track.tempo)
    

  }


// Tempo----------------------------------------------------------------------------------------------- 
getTempo(){
  
  this.setState({
    tempo: this.props.songAnalysis.track.tempo
  })
  // console.log(this.state.tempo)
}

theTempo(){
  let ms
  if(this.state.tempo !== 0){
    ms = 60000/this.state.tempo
  }
  return ms
}
// Tempo----------------------------------------------------------------------------------------------- 



moveOnTempo(){
  setInterval(() => {
    this.setState({
      tempoToggle: this.state.tempoToggle * -1
    })
  }, this.theTempo());
  
  setInterval(() => {
    
    this.knot1.position.z += 6 * this.state.tempoToggle
    this.knot2.position.z += 6 * this.state.tempoToggle
    this.knot3.position.z += 5 * this.state.tempoToggle
    this.knot4.position.z += 4 * this.state.tempoToggle
    // this.knot3.position.z += 1 * this.state.tempoToggle
  }, this.theTempo());
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

    this.controls = new OrbitControls(this.camera, this.el);
    this.camera.position.set( 0, 0, 100 );
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setSize(width, height);
    this.renderer.setClearColor( 0x000000, 0 );
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };



  addCustomSceneObjects = () => {
    this.knot4()
    this.knot3()
    this.knot2()
    this.knot1()
    this.lights()
  };
















  knot1 = () => {
    const geometry = new THREE.TorusKnotGeometry( 34, 2, 41, 3, 2, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: this.state.knot_color_1,
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.knot1 = new THREE.Mesh(geometry, material);

    this.knot1.position.set(0,0,0)
    // this.knot.rotation.set(1040,0,10)
    // this.knot.scale.set(101,1,1)

    this.scene.add(this.knot1);
  }

  knot2 = () => {
    const geometry = new THREE.TorusKnotGeometry( 25, 2, 64, 2, 3, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: this.state.knot_color,
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.knot2 = new THREE.Mesh(geometry, material);

    this.knot2.position.set(0,0,0)
    // this.knot2.rotation.set(1040,0,10)
    // this.knot2.scale.set(101,1,1)

    this.scene.add(this.knot2);
  }

  knot3 = () => {
    const geometry = new THREE.TorusKnotGeometry( 17, 3, 30, 8, 4, 12 );
    const material = new THREE.MeshPhysicalMaterial({
      color: this.state.knot_color_2,
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.knot3 = new THREE.Mesh(geometry, material);

    this.knot3.position.set(0,0,0)
    // this.knot3.rotation.set(1040,0,10)
    // this.knot3.scale.set(101,1,1)

    this.scene.add(this.knot3);
  }

  knot4 = () => {
    const geometry = new THREE.TorusKnotGeometry( 5, 3, 44, 8, 5, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: this.state.knot_color_3,
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.knot4 = new THREE.Mesh(geometry, material);

    this.knot4.position.set(0,0,0)
    // this.knot4.rotation.set(1040,0,10)
    // this.knot4.scale.set(101,1,1)

    this.scene.add(this.knot4);
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
    // this.knot.position.z += .1
    // this.knot.scale.x += -.005

    this.knot1.rotation.z += .02;
    this.knot1.rotation.x += .01;
    this.knot2.rotation.z -= .01;
    this.knot2.rotation.y += .02;
    this.knot3.rotation.z -= .04;
    this.knot3.rotation.y -= .05;
    this.knot4.rotation.x -= .06;
    this.knot4.rotation.y -= .06;
    this.knot4.rotation.z -= .06;
    // this.knot.rotation.y += 0.02;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    

    // this.tl = new TimelineMax()
    // this.tl.to(this.knot.scale, .5, {x: 2, ease: Expo.easeOut})
    // this.tl.to(this.knot.scale, .5 , {x: .5, ease: Expo.easeOut})
    // this.tl.to(this.knot.position, .5, {x: 2, ease: Expo.easeOut})
    // this.tl.to(this.knot.rotation, .5, {x: Math.PI*2, ease: Expo.easeOut})
    // this.tl.to(this.knot.rotation, .5, {z: Math.PI*.5, ease: Expo.easeOut})
    // this.tl.to(this.knot.scale, .5, {y: .5, ease: Expo.easeOut})

    // this.el.addEventListener('click', () => {
    //   this.tl.play()
    // })
// -------------------------------------------------------------
// setTimeout(() =>{
//     this.ham()
//   }, 700 )
// -------------------------------------------------------------


// The window.requestAnimationFrame() method tells the browser that you wish to perform
// an animation and requests that the browser call a specified function
// to update an animation before the next repaint
this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
};

  // beat = () => {
  //   this.tl = new TimelineMax()
  //     this.tl.to()
  // }

  
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
    console.log("New song tempo is: ", this.props.songAnalysis.track.tempo)
    return (
    <div>
      <button onClick={() => console.log("visuals tempo", this.state.tempo)} >visuals tempo</button>
    <div className="visuals" ref={ref => (this.el = ref)} />
    </div>
   )
  }
}

export default Visuals


