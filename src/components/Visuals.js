import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { TweenLite, TimelineMax, Expo, Linear, Back, Sine } from 'gsap';


class Visuals extends Component {

  state={
    tempo: this.props.songAnalysis.track.tempo,
    tempoToggle: 1,
    newEnergy: this.props.energy * .1,
    beats: this.props.songAnalysis.beats
  }


  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
    
    // console.log(this.beat)
    console.log("beats", this.state.beats)
    
    // console.log(this.state.beats[0].duration)
    this.getTempo()
    this.theTempo()
      this.moveOnTempo()
    }
    
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.nowPlaying.song_id !== this.props.nowPlaying.song_id
  }

  componentDidUpdate(){
    // console.log("visuals update", this.props.songAnalysis)
    // console.log("song energy", this.props.energy)
    // console.log("song new energy", this.state.newEnergy)
    // console.log("beat length", this.getBeatDurations())
    this.rain1.position.z = 0
    this.rain2.position.z = 0
    this.knot1.rotation.z = 0
    this.knot2.rotation.z = 0
    this.knot3.rotation.z = 0
    this.knot4.rotation.z = 0
    this.camera.position.set( 0, 0, 230 );

    this.getTempo()
    this.theTempo()

    this.moveOnTempo()

    // console.log("on update",this.props.songAnalysis.track.tempo)
    // console.log(this.theTempo())
    // console.log("updated object", this.props.songAnalysis)

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
    
    this.knot1.rotation.z += 10 * this.state.tempoToggle
    // this.knot2.rotation.z += 10 * this.state.tempoToggle
    this.knot3.rotation.z += 10 * this.state.tempoToggle
    // this.knot4.rotation.z += 10 * this.state.tempoToggle
    // this.knot3.position.z += 1 * this.state.tempoToggle
  }, this.theTempo());
}

// Beat----------------------------------------------------------------------------------------------- 



// Beat----------------------------------------------------------------------------------------------- 









  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.FogExp2(0x1c1c2a, 0.002)
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      4000 // far plane
    );
    // this.listener = new THREE.AudioListener();
    // this.camera.add( listener );

    this.controls = new OrbitControls(this.camera, this.el);
    this.camera.position.set( 0, 0, 230 );
    this.controls.update();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setSize(width, height);
    // this.renderer.setClearColor( "white", 0 );
    this.el.appendChild(this.renderer.domElement); // mount using React ref

  };



  addCustomSceneObjects = () => {
    this.knot4()
    this.knot3()
    this.knot2()
    this.knot1()

  

      let beatTime = []
    
      this.state.beats.forEach((beat) => {
        beatTime.push(Math.floor(beat.duration *1000))
      })
    
      console.log("Im the Beattime", beatTime)
    
      const geometry = new THREE.RingBufferGeometry( 200, 230, 1, 12, 5, 6.3 );
      const material = new THREE.MeshBasicMaterial( {
         color: "white", 
         side: THREE.DoubleSide,
        wireframe: true } );
    
    
      for(let i = 0; i<beatTime.length; i++){
        this.ring = new THREE.Mesh( geometry, material );
          setTimeout(() => {
            this.ring.position.z = -100
            this.scene.add( this.ring );
            console.log(beatTime[i])
          }, beatTime[i])
      }
    

  
    
    this.stars1()
    this.stars2()
    this.stars3()
  
    this.lights()
  };



  // beatGenerator = (beatObject) => {
  //   this.state.beats.forEach((b) => {
  //       this.tl = new TimelineMax()
  //       this.tl.to(this.beat.position, b.duration, {z: '+=40', ease: Expo.easeIn})
  //   })
  // }
  // smoke(){
  //   let loader = new THREE.TextureLoader();

  //   loader.load("smoke_transparent_background.png", function (texture){
  //     const portalGeo = new THREE.PlaneBufferGeometry(350,350);
  //     const portalMaterial = new THREE.MeshStandardMaterial({
  //         map:texture,
  //         transparent: true
  //     });
  //     // for(let p=880;p>250;p--) {
  //         this.particle = new THREE.Mesh(portalGeo,portalMaterial);
  //         this.particle.position.set(2,2,2);
  //         this.particle.rotation.z = Math.random() *360;
  //         // portalParticles.push(particle);
  //         this.scene.add(this.particle);
  //     // }
  // });
  // }

  stars1(){
    const rainGeo = new THREE.Geometry()
    const stars = 15000
    
    for(let i=0; i<stars; i++){
      let raindrop = new THREE.Vector3(
        Math.random() * 800 -500,
        Math.random() * 800 -500,
        Math.random() * 5000 -2000,
        )
        
        rainGeo.vertices.push(raindrop)
      }


      const material = new THREE.PointsMaterial({
        color: "#fcfcfa",
        size: Math.random() * .6 + .2,
        transparent: false
      })
        
      this.rain1 = new THREE.Points(rainGeo, material)
      this.scene.add(this.rain1)
    }


    stars2(){
      const rainGeo = new THREE.Geometry()
      const stars = 25000
      
      for(let i=0; i<stars; i++){
        let raindrop = new THREE.Vector3(
          Math.random() * 500 -250,
          Math.random() * 500 -250,
          Math.random() * 10000 -5000,
          )
          
          rainGeo.vertices.push(raindrop)
        }
  
        // let sprite = new THREE.TextureLoader().load( 'star-map.png' );
  
        const material = new THREE.PointsMaterial({
          color: "#e8d55a",
          size: Math.random() * .6 + .2,
          // map: sprite,
          transparent: true
        })
  
          
        this.rain2 = new THREE.Points(rainGeo, material)
        this.scene.add(this.rain2)
      }


    stars3(){
      const rainGeo = new THREE.Geometry()
      const stars = 5000
      
      for(let i=0; i<stars; i++){
        let raindrop = new THREE.Vector3(
          Math.random() * 500 -350,
          Math.random() * 500 -350,
          Math.random() * 2000 -700,
          )
          
          rainGeo.vertices.push(raindrop)
        }
  
        let sprite = new THREE.TextureLoader().load( 'star-map.png' );
  
        const material = new THREE.PointsMaterial({
          color: "#36ffff",
          size: Math.random() * .8 + .3,
          map: sprite,
          transparent: true
        })
  
          
        this.rain3 = new THREE.Points(rainGeo, material)
        this.scene.add(this.rain3)
      }





  //Outer most ring-----------------------------
  knot1 = () => {
    const geometry = new THREE.TorusKnotGeometry( 92, 5, 30, 3, 2, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: 'rgb(200,100,20)',
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true,
      metalness: 1.0,
    });
    this.knot1 = new THREE.Mesh(geometry, material);

    this.knot1.position.set(0,0,0)
    // this.knot.rotation.set(1040,0,10)
    // this.knot.scale.set(101,1,1)

    this.scene.add(this.knot1);
  }

//second biggest ring-----------------------------
  knot2 = () => {
    const geometry = new THREE.TorusKnotGeometry( 54, 6, 64, 2, 3, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: 'rgb(250,0,0)',
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true,
      metalness: 1.0,
    });
    this.knot2 = new THREE.Mesh(geometry, material);

    this.knot2.position.set(0,0,0)
    // this.knot2.rotation.set(1040,0,10)
    // this.knot2.scale.set(101,1,1)

    this.scene.add(this.knot2);
  }

// second smallest ring -------------------------------------------
  knot3 = () => {
    const geometry = new THREE.TorusKnotGeometry( 35, 8, 30, 8, 4, 12 );
    const material = new THREE.MeshPhysicalMaterial({
      color: 'rgb(255,128,80)',
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true,
      metalness: 1.0,
    });
    this.knot3 = new THREE.Mesh(geometry, material);

    this.knot3.position.set(0,0,0)
    // this.knot3.rotation.set(1040,0,10)
    // this.knot3.scale.set(101,1,1)

    this.scene.add(this.knot3);
  }

// Inner ring----------------------------------------
  knot4 = () => {
    const geometry = new THREE.TorusKnotGeometry( 10, 8, 44, 8, 5, 11 );
    const material = new THREE.MeshPhysicalMaterial({
      color: 'rgb(205,205,205)',
      emissive: 'black',
      side: THREE.DoubleSide,
      flatShading: true,
      metalness: 1.0,
    });
    this.knot4 = new THREE.Mesh(geometry, material);

    this.knot4.position.set(0,0,0)

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

    // this.state.beats.forEach((b) => {
    //   this.tl = new TimelineMax()
    //   this.tl.to(this.beat.position, b.duration, {z: '+=20', ease: Expo.easeIn})
    // })

    this.rain1.position.z += this.props.energy
    this.rain2.position.z += this.props.energy + .2
    this.rain3.rotation.z += .0001 * this.state.newEnergy
    // this.rain.position.x += .01
    
    this.ring.position.z += 20
    this.ring.rotation.z += .005
    this.ring.rotation.x += .03
    this.ring.rotation.y += .03

    this.knot1.rotation.z += (this.state.newEnergy - .05);
    this.knot1.rotation.x += (this.state.newEnergy - .05);
    
    this.knot3.rotation.z -= (this.state.newEnergy + .02);
    this.knot3.rotation.y -= (this.state.newEnergy + .01);
    
    // this.knot2.rotation.x -= (this.state.newEnergy + .02);
    this.knot2.rotation.y -= (this.state.newEnergy - .02);
    // this.knot2.rotation.z -= (this.state.newEnergy + .02);
    
    this.knot4.rotation.x -= (this.state.newEnergy + .02);
    this.knot4.rotation.y += (this.state.newEnergy - .04);
    this.knot4.rotation.z -= (this.state.newEnergy + .02);
    
    // this.beatGenerator(this.beat())
    // this.knot4.scale.x -= .01
    // this.knot4.scale.y -= .01

// this.tl = new TimelineMax()
// this.tl.to(this.knot4.scale, 10, {x: 2, ease: Expo.easeOut})
// this.tl.to(this.knot4.scale, 10, {y: 2, ease: Expo.easeOut})
// this.tl.to(this.knot4.scale, 10, {x: -2, ease: Expo.easeOut})
// this.tl.to(this.knot4.scale, 10, {y: -2, ease: Expo.easeOut})
    
    
    // rainGeo.forEach(p => {
      //   p.velocity -= 0.1 + Math.random() * 0.1;
      //   p.y += p.velocity;
      //   if (p.y < -200) {
        //     p.y = 200;
        //     p.velocity = 0;
        //   }
        // })
        
        
        
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
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
    return (
   
    <div className="visuals" ref={ref => (this.el = ref)} />
   
   )
  }
}

export default Visuals


