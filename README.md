

Purpose:
 -General purpose ERP app for small businesses.

Requirements:

1-The worker user must be able to perform all sales operations: 

	A- Creating a new bill, each bill has a significant ID, time, customer, and phone number.
 	B-adding items from the stock to the bill table.
	C-adding notes to the bill.
	D- search bill history by customer name, id, or history.
 	F-withdraw the bill, or edit it by adding or removing items.
	G- Report ‘out of stock’ of any item.
2-The admin user must be able to:
    A- Add items to the stock and customize their parameters.
    B-Edit existing items data.
    C-Access all DB tables also must be able to export them to .xls files.
    D- Delete existing DB tables after the extra authentication step.
    E- Create accounts for the other users. (also can delete any of them)
    F-Monitor the day's activity with description signs of additions and subtractions operation, the timeline should be segmented by the responsible supervisor's timelines.

3- A cumulative chart should be updated day by day.

Classes and objects:
 - Good():

        - parameter: 
            -length:l||l_ll
            -weight:w || w_ww
            -unit 
        -name
        -image
        -description
        -quantity_stock
    

 - Item():
 
        - item_quantity:1 
        - price_unit
        - id
        
        
- Bill():
	- Bid
 	- c_name (optional)
  	- c_phone
   	- b_total
	- discount
 	- items
  	- date
   	- time
-ItemToBill():
	- required_quantity
	- units
	- total
- User():
  	- Id
   	-name
   	-token
  	  
- Admin():
	- Serial
- Worker():
  	- record_day
  	- delivered
  	- short

    
- UseCases:
ERD:
DFD:
Sequence Diagram:
Test  cases:
