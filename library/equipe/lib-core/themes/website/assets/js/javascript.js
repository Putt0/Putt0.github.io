let serverip = "redeheroes.net";
let iptitle = "IP Copiado";
let ipcopied = "Estamos aguardando por você em nosso servidor.";
let typesweet = "success";

new ClipboardJS(".copyip", {
  text: () => serverip,
}).on("success", (e) => {
  swal(iptitle, ipcopied, typesweet);
});

$.get("https://mcstatus.snowdev.com.br/api/query/" + serverip, function (res) {
  if (res.Online == false) {
    $(".playercount").html("...");
  } else {
    $(".playercount").html(res.PlayersOnline);
  }
});

$(".add-cart").on("click", function (e) {
  e.preventDefault();

  var id = $(this).attr("id");

  $.ajax({
    url: "/shop/cart/add",
    method: "POST",
    data: { id: id },
    dataType: "JSON",
    complete: function (result) {
      const { responseText: data } = result;

      var res = JSON.parse(data);

      if (res.success) {
        swal(
          "Item adicionado",
          "O item foi adicionado no seu carrinho.",
          "success"
        );
        setTimeout(function () {
          $("#cart").load(location.href + " #cart", "");
        }, 1000);
      } else {
        swal("Ocorreu um problema", "Houve um problema em nossa API.", "error");
      }
    },
  });

  return false;
});

$(".remove-cart").on("click", function (e) {
  e.preventDefault();

  var id = $(this).attr("id");

  $.ajax({
    url: "/shop/cart/remove",
    method: "POST",
    data: { id: id },
    dataType: "JSON",
    complete: function (result) {
      const { responseText: data } = result;

      var res = JSON.parse(data);

      if (res.success) {
        swal(
          "Produto removido",
          "O produto do carrinho foi removido.",
          "success"
        );
        setTimeout(function () {
          location.href = "/shop/cart";
        }, 1000);
      } else {
        swal("Ocorreu um problema", "Houve um problema em nossa API.", "error");
      }
    },
  });

  return false;
});

$(".update-cart").on("click", function (e) {
  e.preventDefault();

  var id = $(this).attr("id");
  var p = id.split("-");
  var s = ".quantia-" + p[1];
  var get = $(s).val();

  $.ajax({
    url: "/shop/cart/update",
    method: "POST",
    data: { id: p[0], qnt: get },
    dataType: "JSON",
    complete: function (result) {
      const { responseText: data } = result;

      var res = JSON.parse(data);

      if (res.success) {
        swal(
          "Produto atualizado",
          "O produto do carrinho foi atualizado.",
          "success"
        );
        setTimeout(function () {
          location.href = "/shop/cart";
        }, 1500);
      } else {
        swal("Ocorreu um problema", "Houve um problema em nossa API.", "error");
      }
    },
  });

  return false;
});

$("#applyCupom").on("click", function (e) {
  e.preventDefault();

  var hash = $("#cupom").val();

  $.ajax({
    url: "/shop/cart/cupom",
    method: "POST",
    data: { hash: hash },
    complete: function (result) {
      $("#cupomResult").html(result.responseText);
      $("#cupomModal").modal("hide");
    },
  });

  return false;
});

$("#applyCupom").on("click", function (e) {
  e.preventDefault();

  var hash = $("#cupom").val();

  $.ajax({
    url: "/shop/cart/cupomDiscount",
    method: "POST",
    data: { hash: hash },
    complete: function (result) {
      $("#cupomResultDiscount").html(result.responseText);
    },
  });

  return false;
});

$("#login").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "/login",
    method: "POST",
    data: $(this).serialize(),
    dataType: "JSON",
    complete: function (result) {
      const { responseText: data } = result;

      var res = JSON.parse(data);

      if (res.success) {
        swal("Logado(a)!", "Você foi autenticado com sucesso.", "success");
        setTimeout(function () {
          location.href = "/dashboard";
        }, 1500);
      } else {
        swal("Ocorreu um problema", res.message, "error");
      }
    },
  });

  return false;
});

$("#register").on("submit", function (e) {
  e.preventDefault();

  $.ajax({
    url: "/register",
    method: "POST",
    data: $(this).serialize(),
    dataType: "JSON",
    complete: function (result) {
      const { responseText: data } = result;

      var res = JSON.parse(data);

      if (res.success) {
        swal("Registrado(a)!", "Você foi registrado com sucesso.", "success");
        setTimeout(function () {
          location.href = "/login";
        }, 1500);
      } else {
        swal("Ocorreu um problema", res.message, "error");
      }
    },
  });

  return false;
});
