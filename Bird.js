class Bird extends BaseClass {
  constructor(x,y, image)
  {
    super(x,y,40,40);
    this.image = image;

    this.trejectory = [];

    this.smoke = loadImage("sprites/smoke.png")
    this.framecount = 0;
  }

  display() 
  {
    var position = [];

    this.framecount++;

    if(this.body.speed<3)
    {
      flag = false;

      for(let i=0; i<this.trejectory.length;i++)
      {
        image(this.smoke,this.trejectory[i][0],this.trejectory[i][1]);
      }
    }

    if(flag == true)
    {
      if(this.framecount%2 ==0 )
      {
        position = [this.body.position.x,this.body.position.y]
        this.trejectory.push(position);
      }

      for(let i=0; i<this.trejectory.length;i++)
      {
        image(this.smoke,this.trejectory[i][0],this.trejectory[i][1]);
      }
    }

    super.display();
  }
}
