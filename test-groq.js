const apiKey = process.env.GROQ_API_KEY;
fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: 'You are a helpful assistant. Output JSON: {"test":"ok"}' },
      { role: 'user', content: 'test' }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  })
})
.then(res => res.json().then(data => console.log(res.status, JSON.stringify(data, null, 2))))
.catch(err => console.error(err));
