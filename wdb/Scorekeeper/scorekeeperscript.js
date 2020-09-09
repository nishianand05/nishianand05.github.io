

// Selecting

   // Selecting buttons
var p1b = document.querySelector("#p1");
var p2b = document.getElementById("p2");
var rb = document.querySelector("#reset");
var numin = document.querySelector("input");
  // Selecting display
var finalscoredis = document.querySelector("p span");
var p1disp = document.querySelector("#p1disp");
var p2disp = document.querySelector("#p2disp");

// Initialization
var p1score = 0;
var p2score = 0;
var gameOver = false;
var winningScore = 5;

// Reset function
function reset()
{ p1score = p2score = 0;
  p1disp.textContent = p2disp.textContent = 0;
  gameOver = false;
  p1disp.classList.remove("winner");
  p2disp.classList.remove("winner"); }

// Reset button events
rb.addEventListener("click", function(){ reset(); });

// Player 1 button events
p1b.addEventListener("click", function(){ if(!gameOver)
                                          { p1score++;
                                            if(p1score=== winningScore)
                                            { p1disp.classList.add("winner");
                                              gameOver = true; }
                                            p1disp.textContent = p1score; }  });

// Player 2 button events
p2b.addEventListener("click", function(){ if(!gameOver)
                                          { p2score++;
                                            if(p2score === winningScore)
                                            { p2disp.classList.add("winner");
                                              gameOver = true; }
                                            p2disp.textContent = p2score; } });

// Input button events
numin.addEventListener("change", function(){ finalscoredis.textContent = numin.value;
                                             winningScore = Number(numin.value);
                                              reset();  })
