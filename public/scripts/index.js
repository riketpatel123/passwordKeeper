const copyToClipboard = function(id) {
  let copyText = document.getElementById(id).value;
  navigator.clipboard.writeText(copyText);
};

const createPasswordElement = function(record) {
  const passwordCard = $(`
<div class="card" id="card_${record.id}">
  <div class="card-body">
    <div>
      <div class="name" id="nameLabel_${record.id}">${record.name}</div>
      <span class="userpass">
        <input
          type="text"
          class="form-control mb-2"
          id="username_${record.id}"
          value="${record.account_name}"
          disabled="true"
        />
        <i
          class="fa-regular fa-copy ml-2"
          onclick="copyToClipboard('username_${record.id}')"
        ></i>
      </span>
      <span class="userpass">
        <input
          type="password"
          class="form-control"
          id="password_${record.id}"
          value="${record.password}"
          disabled="true"
        />
        <i
          class="fa-regular fa-copy ml-2"
          onclick="copyToClipboard('password_${record.id}')"
        ></i>
      </span>
    </div>
    <div class="action-button">
      <span class="showbtn" id=${record.id}><i class="fa-solid fa-eye mr-1"></i>Show</span>
      <span class="editbtn" id=${record.id}> <i class="fa-solid fa-pen-to-square mr-1"></i>Edit</span>
      <span class="savebtn" id=${record.id}> <i class="fa-solid fa-floppy-disk mr-1"></i>Save</span>
      <span class="deletebtn" id=${record.id}><i class="fa-solid fa-trash"></i></span>
    </div>
  </div>
</div>`);
  return passwordCard;
};

const renderAllRecords = function(records) {
  $("#allRecords").empty();

  for (let record of records) {
    let $record = createPasswordElement(record);
    $('#allRecords').append($record);
  }
};

$(document).on('click', '.showbtn', function() {
  let id = $(this).attr('id');
  let elementType = $('#password_' + id).attr('type');
  if (elementType === "password") {
    $('#password_' + id).attr("type", "text");
  } else {
    $('#password_' + id).attr("type", "password");
  }

});

$(document).on('click', '.editbtn', function() {
  let id = $(this).attr('id');
  if ($('#password_' + id).prop('disabled')) {
    $('#password_' + id).removeAttr('disabled');
    $('#username_' + id).removeAttr('disabled');
    let nameValue = $('#nameLabel_' + id).html();
    $('#nameLabel_' + id).html(` <input
        type="text"
        class="form-control mb-2"
        id="name_${id}"
        value="${nameValue}"
      />`);
    $(this).css("display", "none");
    $(this).parent().find('.savebtn').css("display", "block");
  }
});

$(document).on('click', '.deletebtn', function() {
  let id = $(this).attr('id');
  let orgWebSite = false;
  if (window.location.href.includes('/org')) {
    orgWebSite = true;
  }
  let data = {
    id: id,
    orgWebSite: orgWebSite
  };
  $.post("/deletePassword", data, function(data) {
    if (data.id) {
      $('#card_' + data.id).remove();
    }
  });
});

$(document).on('click', '.savebtn', function() {
  $(this).css("display", "none");
  $(this).parent().find('.editbtn').css("display", "block");
  let orgWebSite = false;
  if (window.location.href.includes('/org')) {
    orgWebSite = true;
  }
  let id = $(this).attr('id');
  let password = $('#password_' + id).val();
  let username = $('#username_' + id).val();
  let name = $('#name_' + id).val();
  let data = {
    id: id,
    password: password,
    username: username,
    name: name,
    orgWebSite: orgWebSite
  };
  $.post("/editPassword", data, function(data) {
    loadRecords();
  });
});



const options = {};
const loadRecords = function() {
  let url = '/api/passwords/personalPasswords';
  if (window.location.href.includes('/org')) {
    url = '/api/passwords/orgPasswords';
  }
  $.get(url, options, function(data) {
    renderAllRecords(data.passwords);
  });
};


$(() => {

  loadRecords();

  //// CategoriesList ////
  const renderAllCategories = function(categories) {
    $("#categoriesList").empty();

    for (let category of categories) {
      let $item = `<li id="${category.id}">
      ${category.name}</li>`;
      $('#categoriesList').append($item);
    }

    $('ul#categoriesList li').click(function() {
      $('#categoriesList li').removeClass('active');
      $(this).addClass('active');
      let categoryId = $(this).attr('id');
      options["categoryId"] = categoryId;
      loadRecords();
    });

    $('#clearFilterBtn').click(function() {
      $('#categoriesList li').removeClass('active');
      delete options.categoryId;
      loadRecords();
    });
  };

  const loadCategories = function() {
    $.get("/api/passwords/categories", function(data) {
      renderAllCategories(data.categories);
    });
  };
  loadCategories();

  //// OrganizationsList ////
  const renderAllOrganizations = function(organizations) {
    $("#organizationsList").empty();

    for (let organization of organizations) {
      let $item = `<li id="${organization.id}">
    ${organization.name}</li>`;
      $('#organizationsList').append($item);
    }

    $('ul#organizationsList li').click(function() {
      $('#organizationsList li').removeClass('active');
      $(this).addClass('active');
      let organizationId = $(this).attr('id');
      options["organizationId"] = organizationId;

      loadRecords();
    });

    $('#clearOrgFilterBtn').click(function() {
      $('#organizationsList li').removeClass('active');
      delete options.organizationId;
      loadRecords();
    });
  };

  const loadOrganizations = function() {
    $.get("/api/passwords/organizations", function(data) {
      renderAllOrganizations(data.organizations);
    });
  };
  loadOrganizations();
});
