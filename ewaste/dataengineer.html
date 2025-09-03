<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Data Engineer Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Poppins', sans-serif;
    }
  </style>
</head>
<body class="bg-gray-50 min-h-screen p-4">

  <div class="max-w-5xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center bg-white p-4 rounded shadow border border-gray-200">
      <h2 class="text-xl md:text-2xl font-semibold text-gray-800">
        👋 Welcome Engineer
      </h2>
      <div class="flex gap-2">
        <a href="logout.php" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">Logout</a>
        <?php if ($submitted): ?>
          <button onclick="printCertificate()" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition">Print Certificate</button>
        <?php endif; ?>
      </div>
    </div>

    <!-- Phone Number Input -->
    <div class="bg-white p-4 rounded shadow border border-gray-200">
      <label for="userPhone" class="block text-gray-700 font-semibold mb-1">📞 User Phone Number</label>
      <input type="text" id="userPhone" placeholder="" class="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required>
    </div>

    <!-- Form -->
    <form id="productForm" method="POST" class="bg-white p-6 rounded shadow border border-gray-200 space-y-4">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select id="productCategory" onchange="populateProductNames()" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">📂 Select Category</option>
          <option>Large Appliances</option>
          <option>Small Appliances</option>
          <option>IT & Telecom</option>
          <option>Consumer Electronics</option>
          <option>Lighting Equipment</option>
          <option>Electrical Tools</option>
          <option>Toys & Sports</option>
          <option>Medical Devices</option>
          <option>Monitoring Devices</option>
          <option>Batteries & Cables</option>
        </select>

        <select id="productName" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">📦 Select Product</option>
        </select>

        <select name="reuseCategory" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">♻️ Select Condition</option>
          <option>Reuse</option>
          <option>Refurbishable</option>
          <option>Disposal</option>
        </select>

        <input type="number" step="0.01" name="weight" placeholder="⚖️ Weight (kg)" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="flex justify-end gap-2 mt-2">
        <button type="button" onclick="addProductToTable()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">➕ Add Product</button>
        <button type="button" onclick="resetFormAndScroll()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition">🔄 New Submission</button>
      </div>
    </form>

    <!-- Submitted Table -->
    <div id="submittedTable" class="hidden bg-white p-4 rounded shadow border border-gray-200 overflow-x-auto">
      <table class="w-full text-sm text-center">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="py-2">#</th>
            <th>User_id</th>
            <th>Category</th>
            <th>Product</th>
            <th>Condition</th>
            <th>Weight</th>
            <th>CO₂</th>
            <th>Cashback</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tableBody"></tbody>
        <tfoot class="bg-gray-50 font-semibold">
          <tr>
            <td colspan="5" class="text-right py-2">Total</td>
            <td id="totalWeight">0.00</td>
            <td id="totalCO2">0.00</td>
            <td id="totalCashback">₹0</td>
            <td>-</td>
          </tr>
          <tr>
            <td colspan="9" class="text-right pt-4">
              <button type="button" onclick="handleSubmitAll()" class="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded transition">✅ Submit All</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

  </div>

  <script>
    const categoryOptions = {
      "Large Appliances": ["Refrigerator", "Washing Machine", "Air Conditioner"],
      "Small Appliances": ["Mixer", "Toaster", "Electric Kettle"],
      "IT & Telecom": ["Laptop", "Desktop CPU", "Mobile Phone", "Tablet"],
      "Consumer Electronics": ["TV", "CRT Monitor", "Set-top Box"],
      "Lighting Equipment": ["LED Bulb", "Tube Light"],
      "Electrical Tools": ["Drill", "Soldering Iron"],
      "Toys & Sports": ["Remote Car", "Electronic Toy"],
      "Medical Devices": ["Glucometer", "Digital Thermometer"],
      "Monitoring Devices": ["CCTV Camera", "Door Alarm"],
      "Batteries & Cables": ["Power Bank", "USB Cable"]
    };

    function populateProductNames() {
      const category = document.getElementById("productCategory").value;
      const products = categoryOptions[category] || [];
      const productSelect = document.getElementById("productName");
      productSelect.innerHTML = "<option value=''>📦 Select Product</option>" + products.map(p => `<option>${p}</option>`).join('');
    }

    let submittedProducts = [];

    function resetFormAndScroll() {
      document.getElementById("productForm").reset();
      submittedProducts = [];
      updateTable();
      document.getElementById("submittedTable").classList.add("hidden");
      const phoneInput = document.getElementById("userPhone");
      phoneInput.value = "";
      phoneInput.disabled = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateTable() {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      let totalWeight = 0, totalCO2 = 0, totalCashback = 0;

      submittedProducts.forEach((p, i) => {
        tableBody.innerHTML += `
          <tr class="border-t">
            <td class="py-2">${i + 1}</td>
            <td>${p.userId}</td>
            <td>${p.category}</td>
            <td>${p.product}</td>
            <td>${p.condition}</td>
            <td>${p.weight}</td>
            <td>${p.co2.toFixed(2)}</td>
            <td>₹${p.cashback.toFixed(0)}</td>
            <td class="px-2 text-center">
              <button onclick="editProduct(${i})" class="text-yellow-600">✏️</button>
              <button onclick="deleteProduct(${i})" class="text-red-600 ml-2">🗑</button>
            </td>
          </tr>`;
        totalWeight += parseFloat(p.weight);
        totalCO2 += p.co2;
        totalCashback += p.cashback;
      });

      document.getElementById("totalWeight").textContent = totalWeight.toFixed(2);
      document.getElementById("totalCO2").textContent = totalCO2.toFixed(2);
      document.getElementById("totalCashback").textContent = "₹" + totalCashback.toFixed(0);

      if (submittedProducts.length > 0) {
        document.getElementById("submittedTable").classList.remove("hidden");
      }
    }

    function deleteProduct(index) {
      if (confirm("Are you sure?")) {
        submittedProducts.splice(index, 1);
        updateTable();
      }
    }

    function editProduct(index) {
      const item = submittedProducts[index];
      document.getElementById("productCategory").value = item.category;
      populateProductNames();
      document.getElementById("productName").value = item.product;
      document.querySelector('[name="reuseCategory"]').value = item.condition;
      document.querySelector('[name="weight"]').value = item.weight;
      submittedProducts.splice(index, 1);
      updateTable();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function addProductToTable() {
      const userId = document.getElementById("userPhone").value.trim();
      const category = document.getElementById("productCategory").value;
      const product = document.getElementById("productName").value;
      const condition = document.querySelector('[name="reuseCategory"]').value;
      const weight = parseFloat(document.querySelector('[name="weight"]').value);

      if (!userId || !category || !product || !condition || isNaN(weight)) {
        alert("Please fill all fields.");
        return;
      }

      const multipliers = { "Reuse": 2.5, "Refurbishable": 1.8, "Disposal": 1.2 };
      const co2 = weight * multipliers[condition];
      const cashback = co2 * 10;

      submittedProducts.push({ userId, category, product, condition, weight, co2, cashback });
      updateTable();
      document.getElementById("productForm").reset();

      // Disable phone input after first entry
      document.getElementById("userPhone").disabled = true;
    }

    function handleSubmitAll() {
      if (submittedProducts.length === 0) {
        alert("No products to submit!");
        return;
      }
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "allProducts";
      hiddenInput.value = JSON.stringify(submittedProducts);
      document.getElementById("productForm").appendChild(hiddenInput);
      document.getElementById("productForm").submit();
    }

    function printCertificate() {
      const username = "<?php echo $_SESSION['username']; ?>";
      const date = new Date().toLocaleDateString();
      const content = `
        <html>
          <head>
            <title>Certificate</title>
            <style>
              body { text-align: center; font-family: Arial; padding: 50px; }
              .cert { border: 10px solid #4B5563; padding: 50px; }
              h1 { font-size: 48px; color: #1F2937; }
              h2 { font-size: 32px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="cert">
              <h1>Certificate of Contribution</h1>
              <h2>This certifies that</h2>
              <h1>${username}</h1>
              <h2>has successfully submitted e-waste data</h2>
              <p>Date: ${date}</p>
            </div>
          </body>
        </html>
      `;
      const win = window.open('', '', 'width=800,height=600');
      win.document.write(content);
      win.print();
      win.close();
    }
  </script>
</body>
</html>
