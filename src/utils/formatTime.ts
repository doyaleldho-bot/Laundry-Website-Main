//otp
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`
}


//for converting railway time in db to  am/pm 
export const formatTimeFrontend = (time: string) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  return `${h}:${minute} ${ampm}`;
};