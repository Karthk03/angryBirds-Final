class Slingshot
{
    constructor(bodyA, pointB)
    {
        this.slig_img1 = loadImage("sprites/sling1.png");
        this.slig_img2 = loadImage("sprites/sling2.png");
        this.slig_img3 = loadImage("sprites/sling3.png");

        var options = 
        {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.chain = Constraint.create(options);
        this.pointB = pointB;
        World.add(world, this.chain);
    }

    display()
    {
        strokeWeight(4);
        var pointB = this.pointB;

        image(this.slig_img1,200,70,40,150);
        image(this.slig_img2,175,75,40,80);
        if(this.chain.bodyA != null)
        {
            var pointA = this.chain.bodyA.position;
            stroke(48,22,8);
            if(pointA.x>250 || pointA.x<150)
            {
                strokeWeight(2);
            }
            else
            {
                strokeWeight(4);
            }
            line(pointA.x-10, pointA.y-10, pointB.x, pointB.y);
            line(pointA.x-10, pointA.y-10, pointB.x+30, pointB.y-10);
            image(this.slig_img3,pointA.x-15,pointA.y-10,10,25);
        }
    }
    
    launch()
    {
        this.chain.bodyA = null;
        flag = true;
    }
}