# Log Journal (Donia)

_Be sure to write what inspired you, what you learned, how you built your project, and the challenges you faced. 
Format your story in Markdown._

## 10.10.24

- Notes from my brainstorm
- Used AI to help me in deciding among my ideas what would be the best and have a real impact
- Struggled to understand Glasdoor API, not sure why API to choose. Payscale seems to not answer my needs.
- A first version of the backend mocked without AI, it's what I know the best. Done in less than 30 minutes.
- Using gin framework for the first time for HTTP in Go

## 13.10.24 // 14.10.24

- Tried to understand more what I can do with Gemini and Gemma. Getting to understand embeddings how to use them.
- Decided to switch to a chat model, let's try, build, fail and learn
- Had the news from Glasdoor API partnership team... they closed their open API and will not open it to a developer for a hackahton (which I understand)
- Need to shift the solution on that

## 15.10.24

- Chat is working but not as expected
Input Prompt
```shell
1. I am woman willing to learn how to negotitate my future salary because I am not well paid.
2. We are going to do a play role so you can train me to negotiate.
3. Challenge me with real examples and counter offer. Consider an offer as a whole not only the salary.
4. The role play should not be too long and should be engaging.
5. Can you please provide at the end of the roleplay between 3 to 5 feedback on my answers and how I can improve
6 Can you start the conversion! Hi %s! I hope you are doing well.
What did you think about the offer we sent you with a salary %s?`
```

Current output 
```
{"response":{"chatResp":"
## Roleplay: Salary Negotiation\n\n

**You:** 
Hi [Hiring Manager name]! I hope you are 
doing well. What did you think about the offer we sent you with a salary of $60,000?\n\n

**Hiring Manager:**  
Hi [Your Name]! I'm glad you're excited about the opportunity. We're happy with your qualifications and 
believe you'd be a great fit for the team. The salary offered is in line with our company's 
standard for this role, considering your experience. However, we are flexible and open to discussing it further. 
What are your thoughts on the overall package?\n\n*

*You:**  
Thank you for your time.  While I appreciate the offer, 
I'm hoping for a salary closer to $70,000.  I've been researching similar roles in the industry and my experience and 
skillset align with those earning in that range. I am also confident that I can make a significant contribution to your team.  \n\n

**Hiring Manager:**  
I understand your perspective.  We do value your skills and believe you have the potential to be a valuable asset.  
However, we are limited in what we can offer at this time.  We could potentially offer a $65,000 salary with a performance-based bonus structure that could potentially bring you closer to your desired salary range.  
We also offer excellent benefits, including health insurance, paid time off, and a generous 401k matching program.  Would you be open to considering that?\n\n

**You:**  
That's a good starting point.  I appreciate the flexibility and the opportunity to discuss this further. 
I'm still hoping for a salary closer to my desired $70,000.  Could we explore other options, maybe a slight increase in salary or a potential for a quicker review for a raise based on performance?\n\n

**Hiring Manager:**  Let's see what we can do.  
We are confident in your abilities and want to see you succeed here.  We could potentially offer a $68,000 salary with a review for a raise after 6 months based on performance.  
We believe this demonstrates our confidence in you and our commitment to seeing you grow within our company. \n\n**You:**  That sounds like a great compromise! I am very excited about the opportunity to join your team and 
I'm confident I can exceed expectations.  \n\n**Hiring Manager:**  Excellent! We are thrilled to have you on board. We'll send you a revised offer with the agreed upon terms. \n\n## Feedback:\n\n1. **Strong Starting Point:**  You clearly stated your desired salary and backed it up with research and your confidence in your contributions. \n2. 

**Flexibility and Negotiation:** You were willing to compromise while still advocating for your needs. You explored options like a performance-based bonus and a quicker review for a raise.\n3. 
**Confidence and Enthusiasm:** You expressed confidence in your abilities and enthusiasm for the opportunity, which is key to a successful negotiation.\n

4. **Focus on the Whole Package:**  You acknowledged the benefits package, showcasing that you are considering the entire offer.\n

5. **Room for Improvement:**  You can further strengthen your negotiation by highlighting the value you bring to the company beyond your current salary. 

Quantify your past accomplishments and explain how you will contribute to their specific goals.\n\n

Remember, negotiation is a skill that takes practice. By continuing to refine your approach, you can become more confident and successful in your future salary negotiations. \n\n"}}
```

It is not what I am expecting currently... I would expect to have a real conversation. 
Maybe I should use the chat stream.


# 16.10.24

- Teaming with Loubna and bring her knowledge in ML/Data and frontend! 
- Cleaning my work and branches because I am not alone anymore.


# 22.10.24

- Changing all the endpoints to move to websocket logic in the backend so I can actually implement a real chat!

# 23.10.24

- Testing the websocket chat implemented yesterday, tuning it with nice intro messages
- Testing with a basic frontend to see what it looks like

# 07.10.24

- Did not write since a long moment BUT we have been working in the background
- I am impressed by what Loubna is able to do on the frontend side and even her knowledge about ML and models
- I am so happy that I can teach her some stuff: git, maarkdown, how to document your code, 
Notion use nice tool to collaborate
- I am sad we did not have the time to explore more about Gemma because she has good knowledge to bring on the table
- Today, we plugged backend and frontend using websocket and her code
- Next step are:
  - Clean all the calls to the backend from the frontend
  - Store all the chats and values properly
  - Dockerize
  - Login is definetely a nice to have since we do not have much time left...

# 08.10.24

- After a long day rock climbing I achieved some little steps
- Update the frontend to handle chat history
- Add a new endpoint on the backend 