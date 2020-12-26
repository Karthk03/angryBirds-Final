class Pig extends BaseClass 
{
  constructor(x, y)
  {
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    this.timer = 255;
    this.flag = true;
  }

  display()
  {
    //console.log(this.body.speed);

    if(this.body.speed<= 3)
    {
      super.display();
    }
    else
    {
      World.remove(world,this.body)
      if(this.flag == true)
      {
        score+=200;
        snort.play();
      }
      if(this.timer >= 0)
      {
        this.timer-=5;
        push();
        tint(255,this.timer);
        image(this.image,this.body.position.x,this.body.position.y,50,50);
        pop();
      }
      this.flag = false;
    }
  }
};