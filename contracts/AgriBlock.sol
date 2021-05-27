//SPDX-License-Identifier: <SPDX-License>SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract AgriBlock
{
//state variables
    address owner;
    uint public cropCounter; //for key as crop mapping n counting crops
    uint public dCropCounter; //for key as dealer's crop mapping n counting crops
    uint public sdCropCounter;//
    uint farmerCounter;
    uint dealerCounter;
    uint subdealerCounter;

    //crops
    uint jwari;
    uint bajari;
    uint wheat;
    uint groundnut;
    bool allPricesSet;
    uint arraySize = 4;
    uint [4]  cropTypes;
   
    uint public dealerProfitPercent;
    uint public subdealerProfitPercent;
    bool setProfitPercent;
   
//mappings
//1 dealer to his address
    mapping ( address => Dealer) public dealers;
//2 subdealer to his address
    mapping ( address => SubDealer) public subdealers;
//3 farmer to his address
    mapping ( address => Farmer) public farmers;
//4 crop
    mapping ( uint  => Crop )  crops;
//5 farmer to his Id

//7 for dealers cropAdde
    mapping (uint => DCrop)  dcrops;
    mapping (uint => SDCrop)  sdcrops;
   
//constructor
constructor(){owner = msg.sender;}

//structs

    struct Farmer
    {
        uint farmerId;
        string farmerName;
        string contact;
        address addrs;
        string email;
        bool isRegistered;
    }

    struct Dealer
    {
        uint dealerId;
        string dealerName;
        string contact;
        address addrs;
        string email;
        bool isRegistered;
    }

    struct SubDealer
    {
        uint subDealerId;
        string subdealerName;
        string contact;
        string email;
        address  addrs;
        bool isRegistered;
    }

    struct Crop
    {
        uint cropId;
        string cropName;
        uint farmer_quantity;
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        address payable subDealerAddrs;
        bool isAdded;
        uint cropPrice;
        //uint cropType;
        string farmerName;
    }
    struct DCrop //struct for delaer's crop
    {
        uint cropId;
        uint farmerCropId;
        string cropName;
        uint farmer_quantity;
        uint dealer_quantity;
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        //bool isAdded;
        uint cropPrice;
        //uint cropType;
        string dealerName;

    }
   
    struct SDCrop ////struct for delaer's crop
    {
        uint cropId;
        uint farmerCropId;
        uint dealerCropId;
        string cropName;
        uint farmer_quantity;
        uint dealer_quantity;
        uint subdealer_quantity;//imp
        string location;
        address payable farmerAddrs;
        address payable dealerAddrs;
        address payable subdealerAddrs;//imp
        //bool isAdded;
        uint cropPrice;
        //uint cropType;
        string subdealerName;

    }

//functions
//functions for GOV
    function setPrice
    (
        uint _jwari,
        uint _bajari,
        uint _wheat,
        uint _groundnut
    )
    public
    {
        
        require ( msg.sender == owner, " Only government can call");

        cropTypes[0]=_jwari;
        cropTypes[1]=_bajari;
        cropTypes[2]=_wheat;
        cropTypes[3]=_groundnut;
        allPricesSet = true;
      }
   
    function setProfitPercentage
    (
        uint _forDealer,
        uint _forSubdealer
    )
    public
    {
        require ( msg.sender == owner, " Only government can call");
        dealerProfitPercent =_forDealer;
        subdealerProfitPercent = _forSubdealer;
        setProfitPercent = true;
       
    }

//functions for farmer

    function registerFarmer
    (
        string memory _farmerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be farmer");
        require (farmers[msg.sender].isRegistered == false && dealers[msg.sender].isRegistered == false && subdealers[msg.sender].isRegistered == false, "You are already registred");
        // require (, "You are already Dealer");
        // require (, "You are already subdealer");
        farmerCounter++;
        Farmer memory farmer = Farmer ( farmerCounter, _farmerName, _phoneNumber, msg.sender, _email ,true);
        farmers [msg.sender] = farmer;
    }

    function addCropDetails   //only farmer can call
    (
        uint _cropType,
        uint _quantity,
        string memory _location
    )
    public
    {
        require ( allPricesSet==true , "gov isnt initialized prices yet" );
        require ( setProfitPercent == true , "gov isnt initialized profit rates yet" );
        require (farmers[msg.sender].isRegistered == true, "You are not registered yet or you are not farmer");
        uint cropPr = cropTypes[_cropType]; //fetched cropPrice by cropType (by gov)
        cropCounter++;
        Crop memory crop ;
       
        if( _cropType == 0)
        {crop.cropName = "jawar";}
        else if(_cropType == 1)
        {crop.cropName = "bajara";}
        else if(_cropType == 2)
        {crop.cropName = "wheat";}
        else{crop.cropName = "groundnut";}
       
        crop.cropId=cropCounter;
        //adding crop type to cropType
        //crop.cropType = _cropType;        
        crop.farmer_quantity=_quantity;
        crop.location=_location;
        crop.farmerAddrs = payable(msg.sender);
        crop.cropPrice = cropPr ;
        crop.isAdded=true;
        crop.farmerName=farmers[msg.sender].farmerName;
        crops[cropCounter] = crop;
        
    }
 
    //functions for dealer
    function registerDealer
    (
        string memory _dealerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be dealer" );
        // require ( , "You are already registered");
        require (farmers[msg.sender].isRegistered == false && dealers[msg.sender].isRegistered == false && subdealers[msg.sender].isRegistered == false,   "You are already registered");
        // require (, "You are already subealer");
        dealerCounter++;
        Dealer memory dealer = Dealer (dealerCounter,_dealerName,_phoneNumber, msg.sender, _email, true );
        dealers[msg.sender]=dealer;
        //emit dealerRegistered( _dealerName,_phoneNumber,_email);
    }

    function seeCropsAtFarmer 
    (uint _cropId)
    public view 
    returns( Crop memory)
    {
        //&& _cropId >0
        require (_cropId <= cropCounter , "Invalid crop Id");
        return crops[_cropId];
    }


    function buyFromFarmer
    (
        uint _cropId,
        uint _quantity
    )
    public payable //for dealer
    {
        //&& _cropId >0 && _quantity >0 
        require ( dealers[msg.sender].isRegistered == true , "You are not dealer or not registered" );
        require (_cropId <= cropCounter , "enter valid crop id");
        require(msg.value == ((crops[_cropId].cropPrice)* 1000000 wei)* _quantity, "Please send exact amount" );
        require((crops[_cropId].farmer_quantity)>=_quantity,"crop in this quantity is not available");
        //creating dealers crop instance    
        DCrop memory dcrop;
        dCropCounter++;
        dcrop.cropId=dCropCounter;
        dcrop.farmerCropId= _cropId;//////////////////////////////////////new add
        //dcrop.cropType = crops[_cropId].cropType;//adding crop type to cropType
        dcrop.farmer_quantity = (crops[_cropId].farmer_quantity)-(_quantity);//_fQuantity;
        dcrop.cropName = crops[_cropId].cropName;
        dcrop.dealer_quantity = _quantity;
        dcrop.location = crops[_cropId].location;//_loc;
        dcrop.farmerAddrs = crops[_cropId].farmerAddrs; //_fAddrs;
        dcrop.dealerAddrs = payable(msg.sender);
        dcrop.dealerName = dealers[msg.sender].dealerName;
        //dcrop.isAdded = true;
        dcrop.cropPrice = ((((crops[_cropId].cropPrice)) * dealerProfitPercent)/ 100)+crops[_cropId].cropPrice;
        //modifying farmer's crop ( decreasing farmer's qnt)
        crops [_cropId].farmer_quantity = ( crops[_cropId].farmer_quantity ) - ( _quantity ); //newFarmerQuantity;//changing new farmer qnt
                
        crops[_cropId].farmerAddrs.transfer( ((crops[_cropId].cropPrice)* 1000000 wei)* _quantity );// transferrina money to farmer for his crops
        dcrops[dCropCounter] = dcrop;// adding dealer's crop to mapping
        //emit boughtFromFarmer( dcrops[dCropCounter]);
    }
   
    function dealerSetPriceOfCropExpl //for competetion between dealers
    (
        uint _cropId,
        uint _newPrice
    )
    public
    {
        require ( _cropId <=dCropCounter,"Enter valid number");
        require ( dealers[msg.sender].isRegistered == true, "You are not registred");
        require ( _newPrice <= ((((crops[ dcrops[_cropId ].farmerCropId].cropPrice)  * dealerProfitPercent )/100 ) + (crops[ dcrops[_cropId ].farmerCropId].cropPrice)), "Not allowedto set price higher than gov price" );
        dcrops[_cropId].cropPrice =_newPrice;
       // emit newPriceSetByDealer(_newPrice);
    }

//functions for subdealer
    function registerSubdealer
    (
        string memory _subdealerName,
        string memory _phoneNumber,
        string memory _email
    )
    public
    {
        require ( msg.sender!= owner ,"owner cant be subdealer" );
        // require ( subdealers[msg.sender].isRegistered == false, "You are already registered");
        require (farmers[msg.sender].isRegistered == false && dealers[msg.sender].isRegistered == false &&  subdealers[msg.sender].isRegistered == false, "You are already registred");
        // require (dealers[msg.sender].isRegistered == false, "You are already dealer");
        subdealerCounter++;
        SubDealer memory subdealer = SubDealer (subdealerCounter,_subdealerName,_phoneNumber, _email,msg.sender, true );
        subdealers [msg.sender]=subdealer;
        //emit subdealerRegistered( _subdealerName,_phoneNumber,_email );
    }

    function seeCropsAtDealer 
    (uint _cropId)
    public view returns(DCrop memory ) //for subdealer
    {
        require (  _cropId <= dCropCounter,"Enter valid crop id");
        return dcrops[_cropId];
    }

    function buyFromDealer
    (
        uint _cropId,
        uint _quantity
    )
    public payable //for subdealer
    {
        //&& _cropId >0 && _quantity >0
        require ( subdealers[msg.sender].isRegistered == true , "You are not registered or you are not subdealer" );
        require (_cropId <= dCropCounter ,"Enter valid numbers");
        require(msg.value == ((dcrops[_cropId].cropPrice)* 1000000 wei)* _quantity, "Please send exact amount" );
        require((dcrops[_cropId].dealer_quantity) >= _quantity,"crop in this quantity is not available");
        //creating subdealers crop instance    
        SDCrop memory sdcrop;
        sdCropCounter++;
        sdcrop.cropId = sdCropCounter;
        sdcrop.farmerCropId = dcrops[_cropId].farmerCropId;///////////////////////new add
        sdcrop.dealerCropId = _cropId;
        //adding crop type to cropType
        //sdcrop.cropType = dcrops [_cropId].cropType;
        sdcrop.farmer_quantity = dcrops[_cropId].farmer_quantity;
        sdcrop.dealer_quantity = (dcrops[_cropId].dealer_quantity) - ( _quantity);
        sdcrop.subdealer_quantity = _quantity;
        sdcrop.cropName = dcrops[_cropId].cropName;
        sdcrop.location = dcrops[_cropId].location;
        sdcrop.farmerAddrs = dcrops[_cropId].farmerAddrs;
        sdcrop.dealerAddrs = dcrops[_cropId].dealerAddrs;
        sdcrop.subdealerAddrs = payable(msg.sender);
        sdcrop.subdealerName = subdealers[msg.sender].subdealerName;
        //sdcrop.isAdded = true;
        sdcrop.cropPrice = (((dcrops[_cropId].cropPrice)* subdealerProfitPercent)/ 100 ) + dcrops[_cropId].cropPrice;
        //modifying dealer's crop ( decreasing farmer's qnt)
        dcrops [_cropId].dealer_quantity = ( dcrops[_cropId].dealer_quantity ) - ( _quantity );//changing new dealer qnt
        
        dcrops[_cropId].dealerAddrs.transfer( ((dcrops[_cropId].cropPrice) * 1000000 wei)* _quantity );// transferrina money to dealer for his crops
        sdcrops[sdCropCounter] = sdcrop;// adding subdealer's crop to mapping
        //emit boughtFromDealer( sdcrops[sdCropCounter]);
    }
   
    function subdealerSetPriceOfCropExpl
    (
        uint _cropId,
        uint _newPrice
    )
    public
    {
        require (_cropId <= sdCropCounter ,"This crop id doesn't exist");
        require ( subdealers[msg.sender].isRegistered == true, "You are not registred");
        require ( _newPrice <= ((((dcrops[ sdcrops[_cropId].dealerCropId ].cropPrice)  * subdealerProfitPercent)/100) + (dcrops[  sdcrops[_cropId].dealerCropId  ].cropPrice)), "Setting price higher than gov norms are not allowed" );
        sdcrops[_cropId].cropPrice =_newPrice;
    }
   
//functions for customer
    function seeCropsAtSubdealer 
    (    uint _cropId ) 
    public view returns ( SDCrop memory )//SDCrop memory)
    {  
        require ( _cropId <= sdCropCounter  ,"Enter valid crop Id/No crops available yet");
        return sdcrops[_cropId];
    }


    function buyCrop
    (
        uint _cropId,
        uint _quantity
    )
    public payable//for customer
    {
        require( dealers[msg.sender].isRegistered == false  && subdealers[msg.sender].isRegistered == false , "Dealer and subdealer not allowed to buy crop from subdealer" );
        require( subdealers[msg.sender].isRegistered == false, "Subdealer can't buy crop from subdealer" );
        require ( _cropId <= sdCropCounter && _cropId >0 && sdCropCounter >0,"Enter valid crop Id/crops not available");
        require(msg.value == ((sdcrops[_cropId].cropPrice)* 1000000 wei)* _quantity, "Please send exact amount" );
        //require ( subdealers[msg.sender].addrs != msg.sender , "You cant buy your own crops");//can remove this condition
        require( sdcrops[_cropId].subdealer_quantity >= _quantity ,"This much quantity not available at subdealer");
        uint newSubdealerQuantity = (sdcrops[_cropId].subdealer_quantity) - _quantity;
        sdcrops[_cropId].subdealer_quantity = newSubdealerQuantity;
        
        sdcrops[_cropId].subdealerAddrs.transfer(((sdcrops[_cropId].cropPrice) * 1000000 wei)*_quantity);
        //emit boughtFromSubdealer(_cropId);
    }

    function getPriceForQuantityInWei
    (uint _cropId, uint _quantity)
    public view returns(uint _quote)
    {
        if(dealers[msg.sender].isRegistered == true)
        {
            require(cropCounter>0,"No crops to calculate");
            return (((crops[_cropId].cropPrice) * 1000000 wei) * _quantity);
            }
        else if (subdealers[msg.sender].isRegistered == true)
        {
            require(dCropCounter>0,"No crops to calculate");
            return (((dcrops[_cropId].cropPrice) * 1000000 wei) * _quantity);}
        
        else {
            require(sdCropCounter>0,"No crops to calculate");
            return ((( sdcrops[_cropId].cropPrice) * 1000000 wei) * _quantity);}
        
    }

}

