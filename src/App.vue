<script setup lang="ts">
// 引入组合式API
import { ref, onMounted } from 'vue'
// 引入threejs
import * as THREE from 'three'
// 引入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 引入RGBELoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 引入hdr图片
// import Living-hdr from './assets/image/hdr/Living.hdr'
// 初始化场景
const scene = new THREE.Scene()
// 初始化相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.z = 0.1
// 初始化渲染器
const rennder = new THREE.WebGLRenderer()
rennder.setSize(window.innerWidth, window.innerHeight)
// 获取节点
const container = ref(null)
// 创建一个立方体
// 几何体
// const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
// 材质
// const basicMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})

/* const files = import.meta.globEager('./assets/image/living/*.jpg')
const arrFiles = Object.values(files)
// 材质
const boxMaterials = []
  // 添加纹理
  arrFiles.forEach(item => {
    // console.log(item.default)
    // 获取 / . 最后一次在和位置坐标
    const pos = item.default.lastIndexOf('/')
    const suffix = item.default.lastIndexOf('.')
    // 截取文件名
    const ImageName = item.default.substring(pos+1, suffix)
    // 加载纹理
    const texture = new THREE.TextureLoader().load(item.default)
    if(ImageName === '34_u' || ImageName === '44_d'){
      texture.rotation = Math.PI
      texture.center = new THREE.Vector2(0.5,0.5)
    } 
    // 创建材质 
    boxMaterials.push(new THREE.MeshBasicMaterial({map: texture}))
  })
const boxCube = new THREE.Mesh(boxGeometry,boxMaterials)
boxCube.geometry.scale(1,1,-1)
// 添加到场景
scene.add(boxCube) */
// 创建球体
const sphereGeometry = new THREE.SphereGeometry(15, 32, 16)
// 创建加载器
const rgbeLoader =  new RGBELoader()
rgbeLoader.load('../src/assets/image/hdr/Living.hdr',(texture) => {
  // 材质
  const basicMaterial = new THREE.MeshBasicMaterial({map: texture})
  const sphere = new THREE.Mesh(sphereGeometry, basicMaterial)
  sphere.geometry.scale(1,1,-1)
  // 添加到场景
  scene.add(sphere)
})
// 封装一个渲染函数
const renderFn = () => {
  rennder.render(scene, camera)
  // 请求动画帧
  window.requestAnimationFrame(renderFn)
}
// 当挂载后渲染画布
onMounted(() => {
  // 添加控制器
  const controls = new OrbitControls(camera, container.value)
  controls.update()
  container.enableDamping = true
  container.value.appendChild(rennder.domElement)
  // 挂载完毕后
  renderFn()
})
</script>

<template>
  <div class='container' ref='container'></div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}
</style>
