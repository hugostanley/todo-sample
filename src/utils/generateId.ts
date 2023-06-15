export default function generateId(key: "user" | "todo" | "comment") {
  return key + "-" + Math.random().toString(16).slice(2)
}
