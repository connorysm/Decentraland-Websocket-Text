let textEntitys:Entity[] = [];
let speed:number = 0.1

 export class SimpleMove implements ISystem {
    
    update() {

        
           // createTextEntity("Hello World!", new Vector3(16, 1, 16), new Vector3(1, 1, 1), Color3.Blue(), 30)
          
    

    for(let i = 0; i < textEntitys.length; i++){
      let transform = textEntitys[i].getComponent(Transform)
      let distance = Vector3.Up().scale(speed)
      transform.translate(distance)
      transform.rotate(Vector3.Up(), 1)

      if(transform.position.y > 20 ){
        engine.removeEntity(textEntitys[i]);
        textEntitys.splice(i, 1);
      }
    }
}
  }
  
  engine.addSystem(new SimpleMove())
  
  export function createTextEntity(text: string, scale: Vector3, color: Color3, fontSize: number) {
    let textEntity = new Entity()
    let myText = new TextShape(text)
    textEntity.addComponent(
      new Transform({
        position: new Vector3(16, 5, 16),
        scale: scale,
      })
    )
    textEntity.addComponent(myText)
    
    myText.fontSize = fontSize
    // myText.color = Color3.Blue()
    myText.color = color
    //new Font(Fonts.SansSerif)
    myText.font = new Font(Fonts.SansSerif)
    engine.addEntity(textEntity)
    
    textEntitys.push(textEntity)
  }