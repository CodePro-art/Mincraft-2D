import { onMounted, ref } from "vue";

const canvasRef = ref();
const inputText = ref("VANISH");
const inputColor = ref("#ffffff");
const isAnimating = ref(false);
const bubble = ref([]);

const canvasWidth = 800;
const canvasHeight = 400;
function handleDraw() {
  const canvas = canvasRef.value;
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (ctx) {
      ctx.font = "100px Arial";
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const textWidth = ctx.measureText(inputText.value).width;

      ctx.fillStyle = inputColor.value;
      ctx.fillText(
        inputText.value,
        canvasWidth / 2 - textWidth / 2,
        canvasHeight / 2
      );
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const bufferData = imageData.data;
      const colorPosition = [];
      let px;
      let pointer;

      for (let y = 0; y < canvasHeight; y++) {
        pointer = y * 4 * canvasWidth;

        for (let x = 0; x < canvasWidth; x++) {
          px = pointer + x * 4;

          if (
            bufferData[px] !== 0 &&
            bufferData[px + 1] !== 0 &&
            bufferData[px + 2] !== 0
          ) {
            colorPosition.push({
              x,
              y,
              color: [
                bufferData[px],
                bufferData[px + 1],
                bufferData[px + 2],
                bufferData[px + 3]
              ]
            });
          }
        }
      }
      bubble.value = colorPosition.map(({ x, y, color }) => {
        return {
          x,
          y,
          r: 1,
          color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
        };
      });
    }
  }
}

function updateBubble(currentX = 0) {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, currentX, canvasHeight);
    bubble.value.forEach(({ x, y, r, color }) => {
      if (x < currentX) {
        ctx.beginPath();
        ctx.rect(x, y, r, r);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    });
  }
}

function vanishAnimation(currentX = 0) {
  requestAnimationFrame(() => {
    const updatedBubble = [];

    for (let i = 0; i < bubble.value.length; i++) {
      const el = bubble.value[i];
      if (el.x > currentX) {
        updatedBubble.push(el);
      } else {
        if (el.r <= 0) {
          el.r = 0;
          continue;
        }
        el.x = el.x + (Math.random() > 0.5 ? 1 : -1);
        el.y = el.y + (Math.random() > 0.5 ? 1 : -1);
        el.r = el.r - Math.random() * 0.05;
        updatedBubble.push(el);
      }
    }
    bubble.value = updatedBubble;
    updateBubble(currentX);
    if (bubble.value.length > 0) {
      vanishAnimation(currentX + 2);
    } else {
      isAnimating.value = false;
      // handleDraw();
    }
  });
}

function startAnimation() {
  if (inputText.value !== "") {
    handleDraw();
    const min = bubble.value.reduce((pre, cur) => {
      if (cur.r > 0) {
        return cur.x > pre ? pre : cur.x;
      }
      return pre;
    }, Infinity);
    isAnimating.value = true;
    vanishAnimation(min);
  }
}

onMounted(() => {
  handleDraw();
});