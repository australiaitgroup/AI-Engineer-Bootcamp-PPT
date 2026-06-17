from openai import OpenAI

def get_weather(location: str) -> str:
    """Mock weather lookup — replace with a real API call if needed."""
    mock_data = {
        "hangzhou": "24℃，晴，东南风 3 级",
        "beijing": "18℃，多云，北风 2 级",
        "shanghai": "26℃，阴，东风 2 级",
    }
    key = location.lower().split(",")[0].strip()
    return mock_data.get(key, f"{location} 的天气暂无数据")

def send_messages(messages):
    response = client.chat.completions.create(
        model="deepseek-v4-pro",
        messages=messages,
        tools=tools
    )
    return response.choices[0].message

client = OpenAI(
    api_key="Your aip key",
    base_url="https://api.deepseek.com",
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get weather of a location, the user should supply a location first.",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    }
                },
                "required": ["location"]
            },
        }
    },
]

messages = [{"role": "user", "content": "How's the weather in Hangzhou, Zhejiang?"}]
message = send_messages(messages)
print(f"User>\t {messages[0]['content']}")
print("\n")

tool = message.tool_calls[0]
messages.append(message)

# 解析 LLM 返回的函数调用参数，执行真正的 get_weather
import json
tool_args = json.loads(tool.function.arguments)
weather_result = get_weather(tool_args["location"])
messages.append({"role": "tool", "tool_call_id": tool.id, "content": weather_result})
message = send_messages(messages)
print(f"Model>\t {message.content}")