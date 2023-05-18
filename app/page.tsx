import Timer from "./components/timer/Timer";

export default function Home() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return <Timer expiryTime={time} />;
}
