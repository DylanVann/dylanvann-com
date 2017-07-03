class DataPoint
{
    boolean reflected;
    PVector position = new PVector(0, 0);
    PVector velocity = new PVector(0, 0);
}

int slidesCount = 2;
int slide = 1;

int w = 1140;
int wPadding = 50;
int h = 644;

float xOffset = 0;
float yOffset = 0;

float v = 100;

int frameRate = 60;
double t = 0;
float dt = (float) (1.f / (float) frameRate);

float[] spacing = {15, 5};
boolean annotations = false;

ArrayList<DataPoint> allPoints = new ArrayList<DataPoint>();
ArrayList<DataPoint> inPoints = new ArrayList<DataPoint>();
ArrayList<DataPoint> outPoints = new ArrayList<DataPoint>();

class FunctionOfX
{
    float scaleYTarget = 1;
    float scaleY = 1;
    float scaleXTarget = 1;
    float scaleX = 1;
    float xOffsetTarget = 0;
    float xOffset = 0;
    float yOffsetTarget = 0;
    float yOffset = 0;
    float frequency = 0;

    public float maxValue()
    {
        return 0;
    }

    public float minValue()
    {
        return 0;
    }

    public float valueAt(float x)
    {
        return 0;
    }

    void draw()
    {
        beginShape();
        for (int x = 0; x < w + wPadding; x = x + 30)
        {
            PVector point = new PVector(x, valueAt(x));
            vertex(point.x, point.y);
        }
        endShape();
    }

    void update()
    {
        scaleY = lerp(scaleY, scaleYTarget, 0.25f);
        yOffset = lerp(yOffset, yOffsetTarget, 0.25f);
        xOffset = lerp(xOffset, xOffsetTarget, 0.25f);
    }
}

class Sigmoid extends FunctionOfX
{
    float frequency = 0;

    public float valueAt(float x)
    {
        return scaleY * ((1) / (1 + exp(-(((x - xOffset) * (1.0f / scaleX)))))) - (0.5f * scaleY) + yOffset;
    }

    void draw()
    {
        super.draw();
    }

    void update()
    {
        super.update();
    }
}

class PieceWise extends FunctionOfX
{
    float frequency = 0;

    float slope;
    float clipping;

    public float maxValue()
    {
        return -clipping + yOffset;
    }

    public float minValue()
    {
        return clipping + yOffset;
    }

    public float valueAt(float x)
    {
        if (((x) - xOffset) < -clipping / slope)
        {
            return minValue();
        }
        else if (((x) - xOffset) > clipping / slope)
        {
            return maxValue();
        }
        else
        {
            return (((x) - xOffset) * (-slope)) + yOffset;
        }
    }

    void draw()
    {
        beginShape();
        float x1 = (-clipping / slope) + xOffset;
        float x2 = (clipping / slope) + xOffset;
        float y1 = minValue();
        float y2 = maxValue();
        vertex(0, y1);
        vertex(x1, y1);
        vertex(x2, y2);
        vertex(w, y2);
        endShape();
    }

    void update()
    {
        super.update();
    }

    void drawAnnotations()
    {
        float x1 = (-clipping / slope) + xOffset;
        float x2 = (clipping / slope) + xOffset;
        float y1 = minValue();
        float y2 = maxValue();

        stroke(255,0.1f*255);

        textSize(20);
        int padding = 20;

        textAlign(RIGHT, CENTER);
        text("-L", x1 - padding, max(y1,y2));
        text("+L", x1 - padding, min(y1,y2));

        textAlign(CENTER, CENTER);
        text("-L/A", x1, min(y1, y2) - padding);
        text("+L/A", x2, min(y1, y2) - padding);

        dashline(0, y1, w, y1, spacing);
        dashline(0, y2, w, y2, spacing);

        dashline(x1, 0, x1, h, spacing);
        dashline(x2, 0, x2, h, spacing);
    }
}

class SineWave extends FunctionOfX
{
    public float valueAt(float x)
    {
        return (scaleY * sin(2 * PI * frequency * (x))) + yOffset;
    }

    public float maxValue()
    {
        return abs(scaleY) + yOffset;
    }

    public float minValue()
    {
        return -abs(scaleY) + yOffset;
    }

    void draw()
    {
        super.draw();
    }

    void update()
    {
        super.update();
    }
}

FunctionOfX input;
FunctionOfX sigmoid;
PieceWise pieceWise;
FunctionOfX transfer;

public void setup()
{
    size(w, h);
    colorMode(RGB, 255, 255, 255, 100);
    smooth();
    strokeCap(SQUARE);
    w = width + 16;
    h = height;

    xOffset = 0.25f * w;
    yOffset = 0.5f * h;

    input = new SineWave();
    input.scaleX = input.scaleXTarget = 2;
    input.scaleY = input.scaleYTarget = 200;
    input.frequency = 0.5f;

    sigmoid = new Sigmoid();
    sigmoid.scaleY = sigmoid.scaleYTarget = 200;
    sigmoid.scaleX = sigmoid.scaleXTarget = -(w) / (12 + 12);
    sigmoid.yOffset = sigmoid.yOffsetTarget = yOffset;
    sigmoid.xOffset = sigmoid.xOffsetTarget = xOffset;
    transfer = sigmoid;

    pieceWise = new PieceWise();
}

void drawTitle()
{
    String title;
    if (slide == 1)
        title = "1 - Nonlinear Amplifier";
    else
        title = "2 - Piecewise Linear Approximation";
    textAlign(LEFT, TOP);
    textSize(40);
    float offset = 30f;
    text(title, offset, offset);
}

void drawBackground()
{
    background(39, 49, 97);
    background(82,101,149);

    strokeWeight(1);
    stroke(255, 0.05f * 255);
    //x
    line(0, yOffset, w, yOffset);
    //y
    line(xOffset, 0, xOffset, h);

    float gridSpacing = 50;
    stroke(255, 0.025f * 255);
    for (int x = 0; x < w; x++)
    {
        if ((-xOffset + x) % gridSpacing == 0)
            line(x, 0, x, h);
    }
    for (int y = 0; y < h; y++)
    {
        if ((-yOffset + y) % gridSpacing == 0)
            line(0, y, w, y);
    }

    stroke(255, 0.025f * 255);
    for (int x = 0; x < w; x++)
    {
        if ((-xOffset + x) % (2 * gridSpacing) == 0)
            line(x, yOffset - gridSpacing / 2, x, yOffset + gridSpacing / 2);
    }
    for (int y = 0; y < h; y++)
    {
        if ((-yOffset + y) % (2 * gridSpacing) == 0)
            line(xOffset - gridSpacing / 2, y, xOffset + gridSpacing / 2, y);
    }
}

void drawAmplitudeTriangle()
{
    float size = 25;
    float x1 = xOffset + size;// + input.max() + 40;
    float x2 = xOffset - size;// + input.min() - 40;
    float y1;
    float y2;
    y1 = transfer.valueAt(x1);
    y2 = transfer.valueAt(x2);

    stroke(255,0.1f*255);
    beginShape();
    vertex(x1,y1);
    vertex(x1,y2);
    vertex(x2,y2);
    endShape();

    if (y2 < y1)
        textAlign(RIGHT, TOP);
    else
        textAlign(RIGHT, BOTTOM);
    text('A', xOffset, yOffset);
}

void spawnPoint()
{
    DataPoint point = new DataPoint();
    point.reflected = false;
    point.position.set(xOffset + input.valueAt((float) t), h + 0.1f * h);
    point.velocity.set(0, -v);
    inPoints.add(point);
    allPoints.add(point);
}

void dashline(float x0, float y0, float x1, float y1, float[] spacing)
{
    float distance = dist(x0, y0, x1, y1);
    float[] xSpacing = new float[spacing.length];
    float[] ySpacing = new float[spacing.length];
    float drawn = 0.0f;  // amount of distance drawn

    if (distance > 0)
    {
        int i;
        boolean drawLine = true; // alternate between dashes and gaps

/*
  Figure out x and y distances for each of the spacing values
  I decided to trade memory for time; I'd rather allocate
  a few dozen bytes than have to do a calculation every time
  I draw.
*/
        for (i = 0; i < spacing.length; i++)
        {
            xSpacing[i] = lerp(0, (x1 - x0), spacing[i] / distance);
            ySpacing[i] = lerp(0, (y1 - y0), spacing[i] / distance);
        }

        i = 0;
        while (drawn < distance)
        {
            if (drawLine)
            {
                line(x0, y0, x0 + xSpacing[i], y0 + ySpacing[i]);
            }
            x0 += xSpacing[i];
            y0 += ySpacing[i];
  /* Add distance "drawn" by this line or gap */
            drawn = drawn + mag(xSpacing[i], ySpacing[i]);
            i = (i + 1) % spacing.length;  // cycle through array
            drawLine = !drawLine;  // switch between dash and gap
        }
    }
}

public void draw()
{
    drawBackground();
    drawHotkeyList();

    stroke(255, 255);
    strokeWeight(2);
    transfer.draw();

    pieceWise.xOffset = sigmoid.xOffset;
    pieceWise.yOffset = sigmoid.yOffset;
    pieceWise.slope = 0.25f * sigmoid.scaleY * (1.0f / -sigmoid.scaleX);
    pieceWise.clipping = 0.5f * sigmoid.scaleY;

    if (annotations)
    {
        drawAmplitudeTriangle();
        pieceWise.drawAnnotations();
    }

    drawTitle();

    textSize(15);
    stroke(255, 255);
    strokeWeight(4);
    float padding = 25;

    float inLineY = max(transfer.valueAt(0), transfer.valueAt(w)) + 50;
    float x1 = xOffset + input.yOffset - abs(input.scaleY);
    float x2 = xOffset + input.yOffset + abs(input.scaleY);
    line(x1 - 10, inLineY, x2 + 10, inLineY);

    textAlign(RIGHT, CENTER);
    text("-Vi", x1 - padding, inLineY);
    textAlign(LEFT, CENTER);
    text("+Vi", x2 + padding, inLineY);

    float outLineX = (float) w * 0.5f;
    float y1 = min(transfer.valueAt(xOffset + input.maxValue()), transfer.valueAt(xOffset + input.minValue()));
    float y2 = max(transfer.valueAt(xOffset + input.maxValue()), transfer.valueAt(xOffset + input.minValue()));
    line(outLineX, y2, outLineX, y1);

    textAlign(CENTER, BOTTOM);
    text("+Vo", outLineX, y1 - padding);
    textAlign(CENTER, TOP);
    text("-Vo", outLineX, y2 + padding);

    stroke(255, 255);
    strokeWeight(2);


    t += dt;

    spawnPoint();

    for (DataPoint point : allPoints)
    {
        point.position = PVector.add(point.position, PVector.mult(point.velocity, dt));
    }

    //Loop backwards so that points are in the correct order.
    for (int i = inPoints.size() - 1; i >= 0; i--)
    {
        DataPoint point = inPoints.get(i);
        if (!point.reflected && point.position.y < inLineY)
        {
            stroke(255);
            line(point.position.x, point.position.y, point.position.x, transfer.valueAt(point.position.x));
            line(point.position.x, transfer.valueAt(point.position.x), outLineX, transfer.valueAt(point.position.x));

            point.reflected = true;
            point.position.set(outLineX, transfer.valueAt(point.position.x));
            point.velocity.set(-point.velocity.y, 0);

            inPoints.remove(point);
            outPoints.add(point);
        }
    }

    for (int i = 0; i < outPoints.size(); i++)
    {
        DataPoint point = outPoints.get(i);
        if (point.position.x > w * 1.1)
        {
            outPoints.remove(point);
            allPoints.remove(point);
            point = null;
        }

    }

    sigmoid.update();
    input.update();

    drawWave(inPoints);
    drawWave(outPoints);
}

void drawHotkeyList()
{
    textSize(15);
    textAlign(LEFT, CENTER);
    float leftPadding = 30;
    float spacing = 30;
    float column = 45;
    int line = 0;
    textSize(25);
    text("Hotkeys", leftPadding, 100+(line*spacing));
    line++;
    textSize(15);
    text("-", leftPadding+column - 10, 100+(line*spacing));
    text("r / f", leftPadding, 100+(line*spacing));
    text("Gain", leftPadding+column, 100+(line*spacing));
    line++;
    text("-", leftPadding+column - 10, 100+(line*spacing));
    text("t / y", leftPadding, 100+(line*spacing));
    text("Vi Amplitude", leftPadding+column, 100+(line*spacing));
    line++;
    text("-", leftPadding+column - 10, 100+(line*spacing));
    text("g / h", leftPadding, 100+(line*spacing));
    text("Vi DC Bias", leftPadding+column, 100+(line*spacing));
    line++;
    text("-", leftPadding+column - 10, 100+(line*spacing));
    text("< / >", leftPadding, 100+(line*spacing));
    text("Slide", leftPadding+column, 100+(line*spacing));
    line++;
    text("-", leftPadding+column - 10, 100+(line*spacing));
    text("a", leftPadding, 100+(line*spacing));
    text("Annotations", leftPadding+column, 100+(line*spacing));
}

void drawWave(ArrayList<DataPoint> points)
{
    noFill();
    stroke(255);
    beginShape();
    if (points.size() > 0)
    {
        DataPoint previousPoint = points.get(0);
        for (int i = 1; i < points.size(); i++)
        {
            DataPoint point = points.get(i);
            line(previousPoint.position.x, previousPoint.position.y, point.position.x, point.position.y);
            previousPoint = point;
        }
    }
    endShape();
}

public void keyPressed()
{
    //Transfer
    if (key == 'r')
    {
        sigmoid.scaleYTarget += 10;
    }
    else if (key == 'f')
    {
        sigmoid.scaleYTarget -= 10;
    }

    //Input
    if (key == 'y')
    {
        input.scaleYTarget += 10;
    }
    else if (key == 't')
    {
        input.scaleYTarget -= 10;
    }
    else if (key == 'h')
    {
        input.yOffsetTarget += 10;
    }
    else if (key == 'g')
    {
        input.yOffsetTarget -= 10;
    }

    //Slide Navigation
    if (keyCode == RIGHT || key == '>')
    {
        slide++;
        if (slide > slidesCount)
            slide = slidesCount;
    }
    if (keyCode == LEFT || key == '<')
    {
        slide--;
        if (slide < 1)
            slide = 1;
    }

    //Annotations
    if (key == 'a')
        annotations = !annotations;

    //Slides
    if (slide == 1)
        transfer = sigmoid;
    if (slide == 2)
        transfer = pieceWise;

    for (DataPoint point : allPoints)
    {
        if (point.velocity.x != 0)
            point.velocity.x = v;
        if (point.velocity.y != 0)
            point.velocity.y = -v;
    }
}
