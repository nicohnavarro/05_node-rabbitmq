import amqp from "amqplib";

const RABBITMQ_URL = "amqp://root:root@localhost";
const QUEUE_NAME = "myQueue";

async function produceMessage() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    const message = "Hello, RabbitMQ!" + new Date().toISOString();
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

    console.log(`Message sent: ${message}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error in producing message:", error);
  }
}

produceMessage();
