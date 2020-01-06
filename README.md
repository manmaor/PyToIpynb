# pytoipynb

Save your python file as jupyter notebook 

## Features

saves the current python file as ipynb to the same location as the python file


## Requirements

The python file needs to be with format:  
``` python
# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
```

## Usage

On an open python file **ctrl+shift+p** -> **Save to .ipynb**


### 1.1.0

fix the export output,  
in code:
* added output  
* added execution_count  
* delete empty cells  

in markdoun: 
* removing first line whitespace

### 1.1.1

add metadata

### 1.1.2
bug fix, spaces after '# %%' working.


**Enjoy!**
