/** Tests different signatures of js.createView function */
var testCase = TestCase("system.JS_CREATE_VIEW.SimpleViews");

var PersonViewModel = function(){
    this.firstName = "John";
    this.lastName = "Smith";
};

testCase.prototype.setUp = function(){
    /** Add view template markup */
    /*:DOC += <script id="viewTemplate" type="text/view">
                <div class='person'>
                    <div class="firstName"></div>
                    <div class="lastName"></div>
                </div>
              </script> */

    /** Add view destination markup */
    /*:DOC += <div id="viewDestination"></div> */
};

testCase.prototype.testCreateView_InstanceViewData_ShouldRenderView = function(){
    var view = js.createView({
        template: "#viewTemplate",
        init: function(viewModel){
            this.bind(viewModel.firstName).to(".firstName");
            this.bind(viewModel.lastName).to(".lastName");
        }
    }, new PersonViewModel());

    this.assertCanRenderView(view);
};

testCase.prototype.testCreateView_ViewClassData_ShouldRenderView = function(){
    var PersonView = function(){
        this.template = "#viewTemplate";
        this.init = function(viewModel){
            this.bind(viewModel.firstName).to(".firstName");
            this.bind(viewModel.lastName).to(".lastName");
        };
    };

    var view = js.createView(PersonView, new PersonViewModel());

    this.assertCanRenderView(view);
};

testCase.prototype.testCreateView_ViewClassInstanceData_ShouldRenderView = function(){
    var PersonView = function(){
        this.template = "#viewTemplate";
        this.init = function(viewModel){
            this.bind(viewModel.firstName).to(".firstName");
            this.bind(viewModel.lastName).to(".lastName");
        };
    };

    var view = js.createView(new PersonView(), new PersonViewModel());

    this.assertCanRenderView(view);
};

testCase.prototype.assertCanRenderView = function(view){
    assertNotNull("View", view);

    view.renderTo("#viewDestination");

    assertTrue("View content rendered", $("#viewDestination .person").length === 1);
    assertEquals("First name", "John", $("#viewDestination .person .firstName").text());
    assertEquals("Last name", "Smith", $("#viewDestination .person .lastName").text());
};